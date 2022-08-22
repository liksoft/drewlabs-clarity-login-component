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
  tap,
} from "rxjs";
import {
  RequestInterface,
  RequestsConfig,
  RequestsConfigParamsType,
  RequestState,
  RequestHandler,
  DispatchLeastArgumentTypes,
  RequestPayload,
  FnActionArgumentLeastType,
  ObservableInputFunction,
  CommandInterface,
  Action,
  State,
  RequestArguments,
} from "./types";
import {
  guid,
  cacheRequest,
  requestsCache,
  useRequestSelector,
} from "./helpers";

// Regex matching request action
// @internal
const REQUEST_METHOD_REGEX = /^post|put|patch|get|delete|options|head/i;

//@internal
const REQUEST_RESULT_ACTION = "[request_result_action]";

export class Requests implements CommandInterface<RequestInterface, string> {
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
  constructor(
    private backend: RequestHandler,
    private config?: RequestsConfig,
    private defaultView?: Window | undefined
  ) {
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
  static createRequestID() {
    return guid();
  }

  /**
   *
   * Internally handle request using client provided request client
   *
   * @param name
   * @param argument
   * @param config
   */
  private makeRequest(
    name: string,
    argument: RequestInterface,
    config?: RequestsConfig
  ) {
    let { params, options, method, body } = argument;
    // We remove any `[` `]` from the starts and the end of the name string
    // to avoid any issue when parsing the name
    name = name.startsWith("[") ? name.substring(1) : name;
    name = (
      name.endsWith("]") ? name.substring(0, name.length - 1) : name
    ).trim();
    let path!: string;
    if (config && config.actions) {
      path =
        typeof config.actions[name] === "string"
          ? (config.actions[name] as string)
          : (config.actions[name] as RequestsConfigParamsType)!.path;
      method =
        method ??
        (typeof config.actions[name] === "string"
          ? "GET"
          : (config.actions[name] as RequestsConfigParamsType)!.method ??
            "GET");
    }
    method = method ?? name.match(REQUEST_METHOD_REGEX)![0];
    if (method === null || typeof method === "undefined") {
      throw new Error(
        "Request action name must be of type [method_endpoint:param1:param2]"
      );
    }
    // Get the request path from the request interface
    path = this.buildRequestPath(
      name,
      method,
      path ?? argument.path,
      params ?? options?.params ?? undefined,
      config
    );
    return () =>
      this.backend.execute(path, method ?? "GET", body, {
        headers: options?.headers ?? {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        responseType: options?.responseType ?? "json",
        params: options?.params || new Object(),
      });
  }

  private buildRequestPath(
    name: string,
    method: string,
    path?: string,
    params?: Record<string, any>,
    config?: RequestsConfig
  ) {
    if (path === null || typeof path === "undefined") {
      path = name.replace(new RegExp(`^${method}_`), "");
    }

    // When requests in the application must be global prefixed
    // We add the prefix to the path variable for each request being performed
    if (config?.prefix) {
      path = `${
        config.prefix.endsWith("/")
          ? config.prefix.substring(0, config.prefix.length - 1)
          : config.prefix
      }/${path}`;
    }

    // // Replace request parameters with their values
    // params = params ?? options?.params ?? undefined;
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          path = path.replace(new RegExp(`:${key}`, "g"), `/${params[key]}`);
        }
      }
    }
    // API endpoint must be separeted with _ symbol when constructed with with action name
    // therefore, we replace any _ with / to match the endpoint path
    return path.replace(/[_]{2}/g, "/");
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
      [this]
    );
  }

  private resolve<T extends ObservableInputFunction>(
    action: Action<RequestInterface> | T,
    ...args: [...DispatchLeastArgumentTypes<T>]
  ): [string, Required<Action<unknown>> | undefined, boolean] {
    let cached: boolean = false;
    const actionType = typeof action;
    let uuid!: string;
    // TODO: finds a meaninful action name for function dispatch
    const name =
      actionType === "function" ? "[requests_fn_action]" : action.name;
    //#region caching request
    const cacheConfig =
      actionType === "function"
        ? (((action as Function).length < args.length
            ? args[args.length - 1]
            : undefined) as FnActionArgumentLeastType)
        : (args[0] as FnActionArgumentLeastType);
    //#endregion caching request
    // Case the last value passed as argument is an instance of {@see FnActionArgumentLeastType}
    // We call the function with the slice of argument from the beginning to the element before the last element
    const argument:
      | [string, RequestInterface | undefined]
      | [string, T, ...DispatchLeastArgumentTypes<T>] =
      actionType === "function"
        ? [
            name,
            action as T,
            ...(((cacheConfig as FnActionArgumentLeastType)?.cacheQuery ||
            args.length > 1
              ? [...args].slice(0, args.length - 1)
              : args) as DispatchLeastArgumentTypes<T>),
          ]
        : [name, (action as Action<RequestInterface>).payload];
    // Comparing functions in javascript is tedious, and error prone, therefore we will only rely
    // not rely on function prototype when searching cache for cached item by on constructed action
    const requestArgument = this.buildCacheQuery(
      argument,
      actionType,
      cacheConfig
    );
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
        uuid = cachedRequest.id ?? Requests.createRequestID();
        // In case the request is cached, we do not proceed any further
        return [uuid, undefined, cached];
      }

      if (Boolean(cachedRequest?.expires())) {
        this.cache.remove(cachedRequest);
      }
    }
    // Here we make sure the request UUID is generated for the request if missing
    uuid = uuid ?? Requests.createRequestID();
    //#endregion Resolves action type or name

    //#region Creates request callback
    const callback = this.createRequestCallback(argument, name, this.config);
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
                // state: "revalidate",
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
          window: this.defaultView as Window,
        })
      );
    }
    //#endregion If request should be cached, we add request to cache
    return [
      uuid,
      {
        name,
        payload: { argument, id: uuid, callback },
      } as Required<Action<RequestPayload<T>>>,
      cached,
    ];
  }

  private buildCacheQuery<T extends ObservableInputFunction>(
    argument:
      | [string, RequestInterface | undefined]
      | [string, T, ...DispatchLeastArgumentTypes<T>],
    actionType: typeof argument[0],
    cacheConfig?: FnActionArgumentLeastType
  ) {
    if (actionType === "function") {
      const _arguments = argument as [
        string,
        T,
        ...DispatchLeastArgumentTypes<T>
      ];
      let name!: string;
      if (
        cacheConfig &&
        typeof cacheConfig.name !== "undefined" &&
        cacheConfig.name !== null
      ) {
        name = cacheConfig.name;
      } else {
        const fn = _arguments[1];
        const funcName = fn.name === "" ? undefined : fn.name;
        const parameters = fn.toString().match(/\( *([^)]+?) *\)/gi);
        name =
          fn.prototype ??
          `${funcName ?? `native anonymous`}${
            parameters ? parameters[0] : "()"
          } { ... }`;
      }
      return [_arguments[0], name, ...argument.slice(2)];
    }
    return [...argument] as [string, RequestInterface | undefined];
  }

  private createRequestCallback<T extends ObservableInputFunction>(
    argument:
      | [string, RequestInterface | undefined]
      | [string, T, ...DispatchLeastArgumentTypes<T>],
    name: string,
    config?: RequestsConfig
  ) {
    if (
      typeof argument === "undefined" ||
      argument === null ||
      !Array.isArray(argument)
    ) {
      return this.makeRequest(name, argument, config);
    }
    const _least = argument.slice(1) as [
      T | RequestInterface,
      ...DispatchLeastArgumentTypes<T>
    ];
    const firstArgument = _least[0];
    if (typeof firstArgument === "function") {
      return () => {
        return firstArgument(..._least.slice(1));
      };
    } else {
      return this.makeRequest(argument[0], firstArgument, this.config);
    }
  }

  // Dispatch method implementation
  dispatch<T extends Function>(
    action: Action<RequestInterface> | T,
    ...args: [...DispatchLeastArgumentTypes<T>]
  ) {
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
    // return this.state$.pipe(
    //   selectRequest(query),
    //   finalize(() => this.cache.invalidate(query))
    // ) as Observable<RequestState<TResult>>;
    return useRequestSelector([this.state$, this.cache])(query);
  }

  destroy() {
    this.cache.clear();
    this.destroy$.next();
  }
}
