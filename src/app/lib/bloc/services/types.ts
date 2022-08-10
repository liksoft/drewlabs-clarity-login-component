import { Observable, ObservableInput } from "rxjs";

//#region Requests service types
export type HTTPRequestMethods =
  | "GET"
  | "DELETE"
  | "OPTION"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "get"
  | "delete"
  | "option"
  | "head"
  | "post"
  | "put"
  | "patch";
export declare type HTTPResponseType =
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
  method?: HTTPRequestMethods;
  body?: unknown;
  params?: Record<string, any>;
  options?: {
    headers?: HeadersInit;
    responseType?: HTTPResponseType;
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

export interface RequestClient {
  /**
   * Makes an HTTP Request to a server enpoint and returns
   * an observable of response type
   *
   * @param path The path to API resource or full server url
   * @param method
   * @param body
   * @param options
   */
  request<T = unknown>(
    path: string,
    method: HTTPRequestMethods,
    body: unknown,
    options?: {
      headers?: HeadersInit;
      responseType?: HTTPResponseType;
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
export type ObservableInputFunction = (...args: unknown[]) => ObservableInput<unknown>;
//#endregion
