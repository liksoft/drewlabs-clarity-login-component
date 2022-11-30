import { deepEqual } from "@azlabsjs/utilities";
import { finalize, Observable, ObservableInput } from "rxjs";
import { CachedRequest, RequestsCache } from "./cache";
import { buildQueryPath, defaultCacheConfig } from "./internal";
import { selectRequest } from "./rx";
import {
  Action,
  CacheQueryConfig,
  RequestHandler,
  RequestInterface,
  RequestsConfig,
  RequestsConfigParamsType,
  RESTQueryFunc,
  State
} from "./types";

/**
 * Creates query parameters by parsing request params options
 *
 * @param query
 */
export function createQueryParams<
  TQuery = string | number | Record<string, unknown>
>(query?: TQuery) {
  const queryType = typeof query;
  if (queryType === "undefined" || query === null) {
    return "";
  }
  return queryType === "string" || queryType === "number"
    ? "/:id"
    : Object.keys(query as Record<string, unknown>).reduce((carry, current) => {
        carry += `/:${current}`;
        return carry;
      }, "");
}

/**
 * @interface
 */
export function useDefaultCacheConfig() {
  return defaultCacheConfig;
}

/**
 * Cached requests factory function for creating { @see CachedRequest } instances
 *
 * @param prop
 */
export function cacheRequest<T>(prop: {
  objectid: string;
  properties: CacheQueryConfig | boolean;
  callback: () => ObservableInput<T>;
  errorCallback?: (error: unknown) => void;
  refetchCallback?: (response: T) => void;
  window?: Window;
  lastError?: unknown;
  argument?: unknown;
}) {
  const {
    callback,
    refetchCallback,
    properties,
    lastError,
    objectid,
    argument,
    errorCallback,
  } = prop;
  return new CachedRequest<T>(
    objectid,
    argument,
    typeof properties === "boolean" ||
    (typeof properties === "object" &&
      properties !== null &&
      deepEqual(properties, {}))
      ? defaultCacheConfig
      : properties,
    callback,
    refetchCallback,
    errorCallback,
    window,
    lastError
  );
}

/**
 * Creates a requests cache instance
 *
 * @internal
 */
export function requestsCache<T = unknown>() {
  return new RequestsCache<T>();
}

/**
 *
 * @param param0
 */
export function useRequestSelector([state$, cache]: [
  Observable<State>,
  RequestsCache | undefined
]) {
  return (argument: unknown) => {
    return state$.pipe(
      selectRequest(argument),
      finalize(() => cache?.invalidate(argument))
    );
  };
}

export function useHTTPActionQuery<T>(
  backend: RESTQueryFunc<T> | RequestHandler,
  action: Action<RequestInterface>,
  config?: RequestsConfig
) {
  return () => {
    let { name, payload } = {
      ...action,
      payload: (action as Action<RequestInterface>).payload ?? {},
    };
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
          ? "GET"
          : (config.actions[name] as RequestsConfigParamsType)!.method ??
            "GET");
    }
    method =
      method ?? name.match(/^POST|PUT|PATCH|GET|DELETE|OPTIONS|HEAD/i)![0];
    if (method === null || typeof method === "undefined") {
      throw new Error(
        "Request action name must be of type [method_endpoint:param1:param2]"
      );
    }
    // Get the request path from the request interface
    path = buildQueryPath(
      name,
      method,
      path ?? payload.path,
      params ?? options?.params ?? undefined,
      config
    );
    return (
      typeof backend === "function" ? backend : backend.execute.bind(backend)
    )(path, method ?? "GET", body, {
      headers: options?.headers ?? {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: options?.responseType ?? "json",
      params: options?.params || new Object(),
    });
  };
}
