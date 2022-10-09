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
  state: "success" | "revalidate" | "error" | "loading";
  argument: TPayload;

  // Optional properties
  response?: unknown;
  method?: string;
  ok?: boolean;
  error?: unknown;
  timestamps: {
    createdAt?: number;
    updatedAt?: number;
  };
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
export type RequestInterface<TMethod extends string = string> = {
  path?: string;
  method?: TMethod;
  body?: unknown;
  params?: Record<string, any>;
  options?: {
    headers?: [string, string][] | Record<string, string>;
    responseType?: ResponseType;
    params?: Record<string, any> | { [header: string]: string | string[] };
    withCredentials?: boolean;
  };
};

// @internal
export type FuncRequestType<T = unknown> = () => ObservableInput<T>;

// @internal
export type RequestPayload<TFunc extends Function> = {
  argument: RequestInterface | [TFunc, ...DispatchLeastArgumentTypes<TFunc>];
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
  execute<T = unknown>(
    path: string,
    method: string,
    body: unknown,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
    }
  ): ObservableInput<T>;
}

/**
 * @internal
 */
export type DispatchLeastArgumentTypes<F> = F extends (
  ...args: infer A
) => ObservableInput<unknown>
  ? [...A, FnActionArgumentLeastType] | [...A]
  : F extends RequestInterface
  ? [CacheQueryConfig | boolean] | []
  : never;

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
  name: string;
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

export interface CommandInterface<TRequest = unknown, R = unknown> {
  dispatch<T extends Function>(
    action: Action<TRequest> | T,
    ...args: [...DispatchLeastArgumentTypes<T>]
  ): R;
}

/**
 * @internal
 */
export type RequestArguments =
  | RequestInterface
  | [ObservableInputFunction, ...unknown[]];

/**
 * // Requests store state
 * @internal
 */
export type State = {
  performingAction: boolean;
  requests: RequestState<RequestArguments>[];
  lastRequest?: RequestState<RequestArguments>;
};

/**
 * @internal
 */
export type BaseQueryType<TMethod extends string> = {
  path: string;
  observe?: ObserveKeyType;
  method?: TMethod;
};

/**
 * @internal
 */
export type ObserveKeyType = "request" | "response" | "body" | undefined;

export type QueryType<TMethod extends string = string> =
  BaseQueryType<TMethod> & {
    body?: unknown;
    params?: Record<string, any> | { [prop: string]: string | string[] };
  };

/**
 * @internal
 */
export type QueryParameter<TFunc, TMethod extends string> = {
  methodOrConfig: QueryType<TMethod> | TFunc;
  arguments?: [...DispatchLeastArgumentTypes<TFunc>];
};

/**
 * @description Query client base interface
 */
export type QueryClientType<TMethod extends string> = {
  /**
   * Sends a client request to a server enpoint and returns
   * an observable of response type
   *
   * @param query
   */
  invoke<TFunc extends ObservableInputFunction>(
    query: QueryType<TMethod> | TFunc,
    ...args: [...DispatchLeastArgumentTypes<TFunc>]
  ): Observable<RequestState<RequestArguments>>;
};

/**
 * @description Provides implementation for querying a resource
 */
export type QueryProviderType<TQueryParameters extends [...any[]] = any, ProvidesType extends any = any> = {
  /**
   * Sends a client request to a server enpoint and returns
   * an observable of response type
   *
   * @param query
   */
  query: (...args: TQueryParameters) => Observable<ProvidesType>;
};
//#endregion
