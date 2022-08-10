import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { useRxEffect, useRxReducer } from "@azlabsjs/rx-hooks";
import {
  asyncScheduler,
  catchError,
  EMPTY,
  filter,
  finalize,
  from,
  map,
  Observable,
  ObservableInput,
  observeOn,
  of,
  tap,
} from "rxjs";
import { Action, CommandInterface } from "../types/commands";
import { REQUEST_CLIENT } from "../types";
import {
  HTTPRequestMethods,
  RequestInterface,
  RequestsConfig,
  RequestsConfigParamsType,
  RequestState,
  RequestClient,
  FnActionArgumentTypes,
  RequestPayload,
  FuncRequestType,
  FnActionArgumentLeastType,
  RequestPayloadLeastArgumentType,
  CacheQueryConfig,
  ObservableInputFunction,
} from "./types";
import { DOCUMENT } from "@angular/common";
import { guid, cacheRequest, useCache } from "./helpers";

// TODO: Add a caching system on top of the request implementation
// in order to memoize and replay requests

/**
 * // Requests store state
 * @internal
 */
export type State = {
  performingAction: boolean;
  requests: RequestState<RequestInterface | FuncRequestType>[];
  lastRequest?: RequestState<RequestInterface | FuncRequestType>;
};

export const REQUEST_ACTIONS = new InjectionToken<RequestsConfig>(
  "Request actions map definitions"
);

// Regex matching request action
// @internal
const REQUEST_METHOD_REGEX = /^post|put|patch|get|delete/;

//@internal
const REQUEST_RESULT_ACTION = "[request_result_action]";

@Injectable({
  providedIn: "root",
})
export class Requests implements CommandInterface<RequestInterface, string> {
  //#region Properties definitions
  private readonly dispatch$!: (action: Required<Action<unknown>>) => void;
  private readonly state$!: Observable<State>;
  // List of request cached by the current instance
  private cache = useCache();
  // Uncomment the code below to add support for performing action property observable
  // public readonly performingAction$!: Observable<boolean>;
  //#endregion Properties definitions

  // Class constructor
  constructor(
    @Inject(REQUEST_CLIENT) private client: RequestClient,
    @Inject(REQUEST_ACTIONS) @Optional() private config?: RequestsConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    [this.state$, this.dispatch$] = useRxReducer(
      (state, action: Required<Action<unknown>>) => {
        if (action.name.toLocaleLowerCase() === REQUEST_RESULT_ACTION) {
          const { payload } = action as Action<RequestState>;
          const { id, response, error, ok } = (payload ?? {}) as RequestState;
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
          });
          return {
            ...state,
            lastRequest: {
              ...requests[index],
            },
            performingAction: false,
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
          payload: argument,
          response: undefined,
        };
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
      } as State
    );
    // this.performingAction$ = this.state$.pipe(
    //   map((state) => state.performingAction)
    // );
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
   * @param payload
   * @param config
   */
  private makeRequest(
    name: string,
    payload: RequestInterface,
    config?: RequestsConfig
  ) {
    let { params, options, method, body } = payload;
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
          ? "post"
          : (((config.actions[name] as RequestsConfigParamsType)!.method ??
              "post") as HTTPRequestMethods));
    }
    method =
      method ?? (name.match(REQUEST_METHOD_REGEX)![0] as HTTPRequestMethods);
    if (method === null || typeof method === "undefined") {
      throw new Error(
        "Request action name must be of type method_endpoint and must be an http request method"
      );
    }
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

    // Replace request parameters with their values
    params = params ?? options?.params ?? undefined;
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          path = path.replace(new RegExp(`:${key}`, "g"), `/${params[key]}`);
        }
      }
    }
    // API endpoint must be separeted with _ symbol when constructed with with action name
    // therefore, we replace any _ with / to match the endpoint path
    path = path.replace(/[_]{2}/g, "/");
    // Send the actual request to the server
    // TODO: Memoize the request for it to be send later using a caching system

    // Send the actual request to the backend server
    return () =>
      this.client.request(path, method ?? "GET", body, {
        headers: options?.headers ?? {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        responseType: options?.responseType ?? "json",
        params: options?.params || new Object(),
      });
  }

  private sendRequest(request: () => ObservableInput<unknown>, id?: string) {
    useRxEffect(
      from(request()).pipe(
        observeOn(asyncScheduler),
        map((response) => ({
          name: REQUEST_RESULT_ACTION,
          payload: { id, response, ok: true } as Partial<RequestState>,
        })),
        catchError((error) => {
          // Request is configured to be cached if it exists in the cache
          const cachedRequest = this.cache.at(this.cache.indexOf(id));
          if (cachedRequest) {
            cachedRequest.setError(error);
            // Call the cached request retry method
            cachedRequest.retry();
            return EMPTY;
          } else {
            return of({
              name: REQUEST_RESULT_ACTION,
              payload: { id, error, ok: false } as Partial<RequestState>,
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
    ...args:
      | [...RequestPayloadLeastArgumentType<RequestInterface>]
      | FnActionArgumentTypes<T>
      | [...FnActionArgumentTypes<T>, FnActionArgumentLeastType]
  ): [string, Required<Action<unknown>> | undefined, boolean] {
    let cached: boolean = false;
    const actionType = typeof action;
    let uuid!: string; // = Requests.createRequestID();
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
      | RequestInterface
      | [T, ...FnActionArgumentTypes<T>]
      | undefined =
      actionType === "function"
        ? [
            action as T,
            ...(((cacheConfig as FnActionArgumentLeastType)?.cacheQuery ||
            args.length > 0
              ? [...args].slice(0, args.length - 1)
              : args) as FnActionArgumentTypes<T>),
          ]
        : (action as Action<RequestInterface>).payload;
    //#region Resolves action type or name
    if (argument) {
      const cachedRequestIndex = this.cache.indexOf(argument);
      const cachedRequest =
        cachedRequestIndex === -1
          ? undefined
          : this.cache.at(cachedRequestIndex);
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
        this.cache.removeAt(cachedRequestIndex);
      }
    }
    // Here we make sure the request UUID is generated for the request if missing
    uuid = uuid ?? Requests.createRequestID();
    const name =
      actionType === "function" ? "[requests_fn_action]" : action.name;
    //#endregion Resolves action type or name

    //#region Creates request callback
    const callback = this.createRequestCallback(name, argument, this.config);
    //#region Creates request callback

    //#region If request should be cached, we add request to cache
    if (cacheConfig) {
      const { defaultView } = this.document ?? { defaultView: undefined };
      this.cacheRequest(uuid, callback, cacheConfig, defaultView as Window);
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

  private createRequestCallback<T extends ObservableInputFunction>(
    name: string,
    argument?: RequestInterface | [T, ...FnActionArgumentTypes<T>],
    config?: RequestsConfig
  ) {
    if (
      typeof argument === "undefined" ||
      argument === null ||
      !Array.isArray(argument)
    ) {
      return this.makeRequest(name, argument as RequestInterface, config);
    }
    return () => {
      return argument[0](...argument.slice(1));
    };
  }

  /**
   * Add the request to the cache
   *
   * @param id
   * @param callback
   * @param properties
   * @param defaultView
   */
  private cacheRequest<T extends ObservableInputFunction>(
    id: string,
    callback: T,
    properties: CacheQueryConfig | boolean,
    defaultView: Window
  ) {
    this.cache.add(
      cacheRequest({
        id,
        callback,
        refetchCallback: (response) => {
          this.dispatch$({
            name: REQUEST_RESULT_ACTION,
            payload: { id, response, ok: true } as Partial<RequestState>,
          });
        },
        errorCallback: (error) => {
          this.dispatch$({
            name: REQUEST_RESULT_ACTION,
            payload: { id, error, ok: false },
          });
        },
        properties,
        window: defaultView,
      })
    );
  }

  // Dispatch method implementation
  dispatch<T extends Function>(
    action: Action<RequestInterface> | T,
    ...args:
      | [...RequestPayloadLeastArgumentType<RequestInterface>]
      | FnActionArgumentTypes<T>
      | [...FnActionArgumentTypes<T>, FnActionArgumentLeastType]
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
   * @param id
   * @returns
   */
  select(id: string) {
    const observalbe$ = this.state$.pipe(
      map((state) => state.requests.find((request) => request.id === id)),
      filter((state) => typeof state !== "undefined" && state !== null)
    ) as Observable<RequestState>;
    // When no subscriber for the current stream, we mark it as expired
    observalbe$.pipe(
      finalize(() => {
        const cahedRequest = this.cache.at(this.cache.indexOf(id));
        if (cahedRequest) {
          cahedRequest.setExpiresAt();
        }
      })
    );
    return observalbe$;
  }

  // Handles object destruct action
  public ngOnDestroy() {}
}
