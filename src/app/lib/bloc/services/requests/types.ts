import { Observable, ObservableInput } from "rxjs";

//#region Requests service types

export declare type ResponseType =
  | "arraybuffer"
  | "text"
  | "blob"
  | "json"
  | "document";

/**
 * @internal
 */
export type RequestState<TPayload = unknown> = {
  path: string;
  id: string;
  pending: boolean;
  payload: TPayload;
  response: unknown;

  // Optional properties
  method?: string;
  ok?: boolean;
  error?: unknown;
};

/**
 * @internal
 */
export type RequestsConfigParamsType = {
  method?: string;
  path: string;
};

export type RequestsConfig = {
  prefix?: string;
  actions?: Record<string, string | RequestsConfigParamsType>;
};

/**
 * @internal
 */
export type RequestInterface = {
  method?: string;
  body?: unknown;
  params?: Record<string, any>;
  options?: {
    headers?: [string, string][] | Record<string, string>;
    responseType?: ResponseType;
    params?: Record<string, any>;
  };
  cache?: boolean | CacheQueryConfig;
};

// @internal
export type FuncRequestType<T = unknown> = () => ObservableInput<T>;

// @internal
export type RequestPayload<TFunc extends Function> = {
  argument: RequestInterface | [TFunc, ...FnActionArgumentTypes<TFunc>];
  callback: () => ObservableInput<unknown>;
  id: string;
};

/**
 * @description Execute the request based on user provided options.
 *
 * It's internally used by the { @see Requests } service for sending data to
 * backend server used the implemented protocol
 */
export interface RequestHandler {
  /**
   * Sends a client request to a server enpoint and returns
   * an observable of response type
   *
   * @param path The path to API resource or full server url
   * @param method
   * @param body
   * @param options
   */
  request<T = unknown>(
    path: string,
    method: string,
    body: unknown,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any>;
    }
  ): ObservableInput<T>;
}

/**
 * @internal
 */
export type FnActionArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => ObservableInput<unknown>
  ? A
  : F extends (...args: infer B) => Function
  ? B
  : never;

/**
 * @internal
 */
export type RequestPayloadLeastArgumentType<F extends RequestInterface> =
  F extends RequestInterface ? [CacheQueryConfig | boolean] | [] : never;

export type CacheQueryConfig = {
  retries?: number | ((attempt: number, error: unknown) => boolean);
  retryDelay?: number | ((retryAttempt: number) => number);
  refetchInterval?: number | Observable<unknown>;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  staleTime?: number;
  cacheTime?: number;
};

// @internal
export type FnActionArgumentLeastType = CacheQueryConfig & {
  cacheQuery: boolean;
};

// @internal
export type ObservableInputFunction = (
  ...args: unknown[]
) => ObservableInput<unknown>;

/**
 * @internal
 */
export type Action<T = unknown> = {
  name: string;
  payload?: T;
};

/**
 * @internal
 */
export interface CommandInterface<T = unknown, R = unknown> {
  dispatch(action: Action<T>): R;
}
//#endregion
