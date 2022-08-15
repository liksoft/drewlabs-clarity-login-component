import { finalize, Observable, ObservableInput } from "rxjs";
import { CachedRequest, RequestsCache } from "./cache";
import { selectRequest } from "./rx";
import { CacheQueryConfig, State } from "./types";

// @internal
const defaultCacheConfig = {
  retries: 3,
  retryDelay: 1000,
  refetchInterval: 300000, // each 5min
  refetchOnReconnect: true,
  staleTime: 0,
  cacheTime: 300000,
};

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
 * Generates a v4 like universal unique identifier
 *
 * @internal
 */
export function guid() {
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
    typeof properties === "boolean" ? defaultCacheConfig : properties,
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
