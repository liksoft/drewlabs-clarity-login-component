import { memoize } from "@azlabsjs/functional";
import { useRxEffect } from "@azlabsjs/rx-hooks";
import {
  asyncScheduler,
  catchError,
  EMPTY,
  from,
  map,
  Observable,
  ObservableInput,
  observeOn,
  of,
  ReplaySubject,
  startWith,
  Subject,
  tap
} from "rxjs";
import { buildCacheQuery, cacheRequest, requestsCache } from "./caching";
import { useRequestSelector } from "./helpers";
import { guid } from "./internal";
import {
  Action,
  CommandInterface,
  Disposable,
  FnActionArgumentLeastType,
  ObservableInputFunction,
  QueryArguments,
  QueryManager,
  QueryPayload,
  QueryState,
  State
} from "./types";

//@internal
const QUERY_RESULT_ACTION = "[request_result_action]";
const NOQUERYACTION = Symbol("__NO__QUERY__ACTION__");

export type UseReducerReturnType<T, ActionType> = readonly [
  Observable<T>,
  (state: ActionType) => unknown
];

export function useRxReducer<T, ActionType = any>(
  reducer: (state: T, action: ActionType) => T,
  initial: T,
  init?: (_initial: unknown) => T
) {
  // Initialize the state observable and the _lastState variable that will hold the last
  // state of the observable
  let _lastState!: T;
  const _state$ = new ReplaySubject<T>(1);

  // Provides a memoization implementation arround the inital
  const _initcb = memoize(
    init
      ? (_initial: unknown) => {
          _lastState = init(_initial);
          return _lastState;
        }
      : (_initial: unknown) => {
          _lastState = _initial as T;
          return _lastState;
        }
  );

  /**
   * @description Action dispatcher
   */
  const dispatch = (action: ActionType) => {
    _lastState = reducer(_lastState as T, action as ActionType) as T;
    _state$.next(_lastState);
  };

  return [
    _state$.pipe(startWith(_initcb(initial))),
    dispatch,
  ] as UseReducerReturnType<T, ActionType>;
}

export class Requests
  implements
    CommandInterface<string>,
    QueryManager<Observable<QueryState>>,
    Disposable
{
  //#region Properties definitions
  private readonly dispatch$!: (action: Required<Action<unknown>>) => void;
  public readonly state$!: Observable<State>;
  // List of request cached by the current instance
  private _cache = requestsCache();
  private destroy$ = new Subject<void>();

  // Provides an accessor to the request
  get cache() {
    return this._cache;
  }
  //#endregion Properties definitions

  // Class constructor
  constructor() {
    [this.state$, this.dispatch$] = useRxReducer(
      (state, action: Required<Action<unknown>>) => {
        if (action.name.toLocaleLowerCase() === QUERY_RESULT_ACTION) {
          const { payload: resultPayload } = action as Action<QueryState>;
          const {
            id,
            response,
            error,
            ok,
            state: _state,
          } = (resultPayload ?? {}) as QueryState;
          // If the response does not contains any id field, we cannot process any further
          // therefore simply return the current state
          if (null === id || typeof id === "undefined") {
            return { ...state };
          }
          const requests: QueryState[] = [...(state.requests ?? [])];
          const index = requests.findIndex((request) => request.id === id);
          const request = {
            ...(requests[index] ?? {}),
            id,
            pending: false,
            response,
            error,
            ok,
            state: _state,
          };
          if (-1 !== index) {
            requests.splice(index, 1, {
              ...request,
              timestamps: {
                ...(requests[index].timestamps ?? {}),
                updatedAt: Date.now(),
              },
            });
          } else {
            requests.push(request);
          }
          // We loop through all request and check if any of the request is pending
          // If any of the request is pending, we mark the state performingAction state
          // to true
          let performingAction = false;
          for (const current of requests) {
            if (current.pending) {
              performingAction = true;
              break;
            }
          }
          const outState = {
            ...state,
            performingAction,
            lastRequest: {
              ...requests[index],
            },
            requests: [...requests],
          } as State;
          return outState;
        }
        // Case the request action name not equals REQUEST_RESULT_ACTION, we internally handle the request
        // and dispatch the result into the store
        const { payload } = action as Required<Action<QueryPayload>>;
        let { id, argument, callback } = payload;
        let performingAction = false;
        //#region Send the request to the API server
        if (callback) {
          performingAction = true;
          this.sendRequest(callback, id);
        }
        //#endregion Send the request to the API server
        const req = {
          id,
          pending: true,
          state: "loading",
          argument,
          response: undefined,
          timestamps: {
            createdAt: Date.now(),
          },
          // To any created request, add the refetch function
          // that allows developpers to fetch the request
          refetch: () => {
            this.cache.get(id)?.refetch();
          },
        } as QueryState;
        // We returns the currrent state adding the current request with a
        // request id and a pending status
        const outState = {
          ...state,
          performingAction,
          lastRequest: req,
          requests: [
            req,
            // We add the new request at the top of the list
            // for optimization purpose
            ...(state.requests ?? []),
          ],
        } as State;
        return outState;
      },
      {
        performingAction: false,
        requests: [],
        metadata: {
          timestamp: undefined,
        },
      } as State,
      (_initial) => _initial as State
    );
  }

  invoke<T extends Function>(action: T, ...args_0: QueryArguments<T>) {
    return useRequestSelector(
      this.state$,
      this.cache
    )(this.dispatch(action, ...args_0));
  }

  /**
   * Static function for creating a request uuid that is
   * used to uniquely identify the request in the store
   * of application request
   *
   * @return string
   */
  static guid() {
    return guid();
  }

  private sendRequest(request: () => ObservableInput<unknown>, id?: string) {
    useRxEffect(
      from(request()).pipe(
        observeOn(asyncScheduler),
        map((response) => ({
          name: QUERY_RESULT_ACTION,
          payload: {
            id,
            response,
            ok: true,
            state: "success",
          } as QueryState,
        })),
        catchError((error) => {
          // Request is configured to be cached if it exists in the cache
          const cachedRequest = this.cache.get(id);
          if (cachedRequest) {
            cachedRequest.setError(error);
            // Call the cached request retry method
            cachedRequest.retry();
            return EMPTY;
          } else {
            return of({
              name: QUERY_RESULT_ACTION,
              payload: {
                id,
                error,
                ok: false,
                state: "error",
              } as QueryState,
            });
          }
        }),
        tap(this.dispatch$)
      ),
      [this, "destroy"]
    );
  }

  private resolve<F extends ObservableInputFunction>(
    action: F,
    ...args: QueryArguments<typeof action>
  ): [string, Required<Action<unknown>> | Symbol, boolean] {
    let cached: boolean = false;
    let uuid!: string;
    // TODO: finds a meaninful action name for function dispatch
    const actionType = "[requests_fn_action]";
    //#region caching request
    const cacheConfig = (
      (action as Function).length < args.length
        ? args[args.length - 1]
        : undefined
    ) as FnActionArgumentLeastType;
    //#endregion caching request
    // Case the last value passed as argument is an instance of {@see FnActionArgumentLeastType}
    // We call the function with the slice of argument from the beginning to the element before the last element
    const argument: [
      string,
      ObservableInputFunction,
      ...QueryArguments<typeof action>
    ] = [
      actionType,
      action,
      ...(((cacheConfig as FnActionArgumentLeastType)?.cacheQuery ||
      args.length > 1
        ? [...args].slice(0, args.length - 1)
        : args) as QueryArguments<typeof action>),
    ];
    // Comparing functions in javascript is tedious, and error prone, therefore we will only rely
    // not rely on function prototype when searching cache for cached item by on constructed action
    const requestArgument = buildCacheQuery([...argument], cacheConfig);
    //#region Resolves action type or name
    if (requestArgument) {
      const cachedRequest = this.cache.get(requestArgument);
      // Evaluate the staleTime and cacheTime to know if the request expires or not and need to be refetched
      if (
        typeof cachedRequest !== "undefined" &&
        cachedRequest !== null &&
        !cachedRequest.expires()
      ) {
        cached = true;
        // Set the request uuid to the cached request uuid if a cached request is found
        // else, create a new request uuid
        uuid = cachedRequest.id ?? Requests.guid();
        // In case the request is cached, we do not proceed any further
        return [uuid, NOQUERYACTION, cached];
      }

      if (Boolean(cachedRequest?.expires())) {
        this.cache.remove(cachedRequest);
      }
    }
    // Here we make sure the request UUID is generated for the request if missing
    uuid = uuid ?? Requests.guid();
    //#endregion Resolves action type or name

    //#region Creates request callback
    const _least = argument.slice(2) as [...QueryArguments<typeof action>];
    const callback = () => {
      return action(..._least);
    };
    //#region Creates request callback

    //#region If request should be cached, we add request to cache
    if (cacheConfig) {
      this.cache.add(
        cacheRequest({
          objectid: uuid,
          callback,
          properties: cacheConfig,
          argument: requestArgument,
          refetchCallback: (response) => {
            this.dispatch$({
              name: QUERY_RESULT_ACTION,
              payload: {
                id: uuid,
                response,
                ok: true,
              } as QueryState,
            });
          },
          errorCallback: (error) => {
            this.dispatch$({
              name: QUERY_RESULT_ACTION,
              payload: {
                id: uuid,
                error,
                ok: false,
                state: "error",
              } as QueryState,
            });
          },
          window: cacheConfig.defaultView,
        })
      );
    }
    //#endregion If request should be cached, we add request to cache
    return [
      uuid,
      {
        name: actionType,
        payload: { argument, id: uuid, callback },
      } as Required<Action<QueryPayload>>,
      cached,
    ];
  }

  // Dispatch method implementation
  dispatch<T extends Function>(action: T, ...args: [...QueryArguments<T>]) {
    const [uuid, _action, cached] = this.resolve(action as any, ...args);
    // In case the request is cached, we do not dispatch any request action as the
    // The selector will return the return the new state of the request query
    if (!cached && _action !== NOQUERYACTION) {
      this.dispatch$(_action as Required<Action<unknown>>);
    }
    return uuid;
  }

  /**
   * Select a request from the state object based on the request uuid
   *
   * @param query
   * @returns
   */
  select(query: unknown) {
    return useRequestSelector(this.state$, this.cache)(query);
  }

  destroy() {
    this.cache.clear();
    this.destroy$.next();
  }
}

/**
 * Creates an instance of the query manager class
 * It's a factory function that creates the default query manager instance
 */
export function createQueryManager() {
  return new Requests();
}
