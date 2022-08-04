import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { useRxEffect, useRxReducer } from "@azlabsjs/rx-hooks";
import {
  asyncScheduler,
  catchError,
  filter,
  from,
  map,
  Observable,
  observeOn,
  of,
  tap,
} from "rxjs";
import { Action, CommandInterface } from "../types/commands";
import { HTTPRequestMethods, HttpResponseType } from "@azlabsjs/requests";
import { RequestClient, REQUEST_CLIENT } from "../types";

// TODO: Add a caching system on top of the request implementation
// in order to memoize and replay requests

export const REQUEST_ACTIONS = new InjectionToken<RequestsConfig>(
  "Request actions map definitions"
);

// Regex matching request action
// @internal
const REQUEST_METHOD_REGEX = /^post|put|patch|get|delete/;

const guid = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    v4() +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    v4() +
    v4()
  );
};

type RequestType = {
  path: string;
  id: string;
  pending: boolean;
  payload: unknown;
  response: unknown;

  // Optional properties
  method?: string;
  ok?: boolean;
  error?: unknown;
};

// Requests store state
type State = {
  performingAction: boolean;
  requests: RequestType[];
};

type ConfigParamType = {
  method?: string;
  path: string;
};

export type RequestsConfig = {
  prefix?: string;
  actions?: Record<string, string | ConfigParamType>;
};

export type RequestPayload = {
  method?: HTTPRequestMethods;
  body?: unknown;
  params?: Record<string, any>;
  options?: {
    headers?: HeadersInit;
    responseType?: HttpResponseType;
    params?: Record<string, any>;
  };
  id?: string; // Request uuid
};

@Injectable({
  providedIn: "root",
})
export class Requests implements CommandInterface<RequestPayload, string> {
  //#region Properties definitions
  private readonly dispatch$!: (action: Required<Action<unknown>>) => void;
  public readonly state$!: Observable<State>;

  // Uncomment the code below to add support for performing action property observable
  // public readonly performingAction$!: Observable<boolean>;
  //#endregion Properties definitions

  // Class constructor
  constructor(
    @Inject(REQUEST_CLIENT) private client: RequestClient,
    @Inject(REQUEST_ACTIONS) @Optional() config?: RequestsConfig
  ) {
    // action syntax = method_api_endpoint:param1:param2:param3
    [this.state$, this.dispatch$] = useRxReducer(
      (state, action: Required<Action<unknown>>) => {
        if (action.name.toLocaleLowerCase() === "[request_result_action]") {
          const { id, response, error, ok } = (action.payload ?? {}) as {
            id: string;
            response: unknown;
            error: unknown;
          } as Partial<RequestType>;
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
            performingAction: false,
            requests: [...requests],
          } as State;
        }
        // We execute the request which will internally dispatch the request response as action
        this._handleRequest(
          action as Required<Action<RequestPayload>>,
          state,
          config
        );
        const { payload } = action;
        // We returns the currrent state adding the current request with a request id and a pending status
        return {
          ...state,
          performingAction: true,
          requests: [
            // We add the new request at the top of the list
            // for optimization purpose
            {
              id: (payload as RequestPayload & { id: string }).id,
              pending: true,
              payload,
              response: undefined,
            },
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

  // Internally handle request using client provided request client
  private _handleRequest(
    action: Required<Action<RequestPayload>>,
    state: State,
    config?: RequestsConfig
  ) {
    let { name, payload } = action;
    // We remove any `[` `]` from the starts and the end of the name string
    // to avoid any issue when parsing the name
    name = name.startsWith("[") ? name.substring(1) : name;
    name = (
      name.endsWith("]") ? name.substring(0, name.length - 1) : name
    ).trim();
    if (typeof name === "undefined" || name === null) {
      return;
    }
    let path!: string;
    let method = payload.method;
    if (config && config.actions) {
      path =
        typeof config.actions[name] === "string"
          ? (config.actions[name] as string)
          : (config.actions[name] as ConfigParamType)!.path;
      method =
        method ??
        (typeof config.actions[name] === "string"
          ? "post"
          : (((config.actions[name] as ConfigParamType)!.method ??
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
    const params = payload?.params ?? payload.options?.params;
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
    const { body, id, options } = payload;
    useRxEffect(
      from(
        this.client.request(path, method as any as HTTPRequestMethods, body, {
          headers: options?.headers ?? {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          responseType: options?.responseType ?? "json",
          params: options?.params || new Object(),
        })
      ).pipe(
        observeOn(asyncScheduler),
        map((response) => ({
          name: "[request_result_action]",
          payload: { id, response, ok: true } as Partial<RequestType>,
        })),
        catchError((error) => {
          // TODO: In future releases, add implement a consistent error handler
          return of({
            name: "[request_result_action]",
            payload: { id, error, ok: false } as Partial<RequestType>,
          });
        }),
        tap(this.dispatch$)
      ),
      [this]
    );
  }

  // Dispatch method implementation
  dispatch(action: Action<RequestPayload>) {
    // Creates a unique identifier for the request being send by the client
    // in order to track the request later
    const { payload } = action;
    const uuid = payload ? payload.id ?? guid() : guid();
    this.dispatch$({
      ...action,
      payload: payload ? { ...payload, id: uuid } : { id: uuid },
    });
    return uuid;
  }

  /**
   * Select a request from the state object based on the request uuid
   *
   * @param id
   * @returns
   */
  select(id: string) {
    return this.state$.pipe(
      map((state) => state.requests.find((request) => request.id === id)),
      filter((state) => typeof state !== "undefined" && state !== null)
    ) as Observable<RequestType>;
  }

  // Handles object destruct action
  public ngOnDestroy() {}
}
