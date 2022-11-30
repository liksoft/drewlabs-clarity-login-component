import { useRxEffect, useRxReducer } from "@azlabsjs/rx-hooks";
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
  Subject,
  tap
} from "rxjs";
import { cacheRequest, requestsCache, useRequestSelector } from "./helpers";
import { buildCacheQuery, guid } from "./internal";
import {
  Action,
  CommandInterface,
  FnActionArgumentLeastType,
  ObservableInputFunction,
  QueryArguments,
  RequestArguments,
  RequestPayload,
  RequestState,
  State
} from "./types";

//@internal
const REQUEST_RESULT_ACTION = "[request_result_action]";

export class Requests implements CommandInterface<string> {
  //#region Properties definitions
  private readonly dispatch$!: (action: Required<Action<unknown>>) => void;
  public readonly state$!: Observable<State>;
  // List of request cached by the current instance
  private _cache = requestsCache();
  private destroy$ = new Subject<void>();
  // Uncomment the code below to add support for performing action property observable
  public readonly performingAction$;

  // Provides an accessor to the request
  get cache() {
    return this._cache;
  }
  //#endregion Properties definitions

  // Class constructor
  constructor() {
    [this.state$, this.dispatch$] = useRxReducer(
      (state, action: Required<Action<unknown>>) => {
        if (action.name.toLocaleLowerCase() === REQUEST_RESULT_ACTION) {
          const { payload } = action as Action<RequestState>;
          const {
            id,
            response,
            error,
            ok,
            state: _state,
          } = (payload ?? {}) as RequestState;
          // If the response does not co][ntains any id field, we cannot process any further
          // therefor simply return the current state
          if (null === id || typeof id === "undefined") {
            return { ...state };
          }
          const requests = [...(state.requests ?? [])];
          const index = requests.findIndex((request) => request.id === id);
          requests.splice(index, 1, {
            ...(requests[index] ?? {}),
            id,
            pending: false,
            response,
            error,
            ok,
            state: _state,
            timestamps: {
              ...(requests[index].timestamps ?? {}),
              updatedAt: Date.now(),
            },
          });
          return {
            ...state,
            lastRequest: {
              ...requests[index],
            },
            requests: [...requests],
          } as State;
        }
        // Case the request action name not equals REQUEST_RESULT_ACTION, we internally handle the request
        // and dispatch the result into the store
        const { payload } = action as Required<
          Action<RequestPayload<ObservableInputFunction>>
        >;
        let { id, argument, callback } = payload;
        //#region Send the request to the API server
        if (callback) {
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
        } as RequestState<RequestArguments>;
        // We returns the currrent state adding the current request with a
        // request id and a pending status
        return {
          ...state,
          lastRequest: req,
          performingAction: true,
          requests: [
            req,
            // We add the new request at the top of the list
            // for optimization purpose
            ...(state.requests ?? []),
          ],
        } as State;
      },
      {
        performingAction: false,
        requests: [],
        metadata: {
          timestamp: undefined,
        },
      } as State
    );
    this.performingAction$ = this.state$.pipe(
      map((state) => state.performingAction)
    );
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
          name: REQUEST_RESULT_ACTION,
          payload: {
            id,
            response,
            ok: true,
            state: "success",
          } as RequestState<RequestArguments>,
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
              name: REQUEST_RESULT_ACTION,
              payload: {
                id,
                error,
                ok: false,
                state: "error",
              } as RequestState<RequestArguments>,
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
  ): [string, Required<Action<unknown>> | undefined, boolean] {
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
    const requestArgument = buildCacheQuery(argument, cacheConfig);
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
        return [uuid, undefined, cached];
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
              name: REQUEST_RESULT_ACTION,
              payload: {
                id: uuid,
                response,
                ok: true,
              } as RequestState<RequestArguments>,
            });
          },
          errorCallback: (error) => {
            this.dispatch$({
              name: REQUEST_RESULT_ACTION,
              payload: {
                id: uuid,
                error,
                ok: false,
                state: "error",
              } as RequestState<RequestArguments>,
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
      } as Required<Action<RequestPayload<ObservableInputFunction>>>,
      cached,
    ];
  }

  // Dispatch method implementation
  dispatch<T extends Function>(action: T, ...args: [...QueryArguments<T>]) {
    const [uuid, _action, cached] = this.resolve(action as any, ...args);
    // In case the request is cached, we do not dispatch any request action as the
    // The selector will return the return the new state of the request query
    if (!cached && typeof _action !== "undefined" && _action !== null) {
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
    return useRequestSelector([this.state$, this.cache])(query);
  }

  destroy() {
    this.cache.clear();
    this.destroy$.next();
  }
}
