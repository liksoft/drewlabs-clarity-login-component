import { ObservableInput } from "rxjs";
import { CachedRequest, RequestsCache } from "./cache";
import { CacheQueryConfig } from "./types";

const defaultCacheConfig = {
  retries: 3,
  retryDelay: 1000,
  refetchInterval: 300000, // each 5min
  refetchOnReconnect: true,
  staleTime: 0,
  cacheTime: 300000,
};

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

export function cacheRequest<T>(prop: {
  objectid: string;
  properties: CacheQueryConfig | boolean;
  callback: () => ObservableInput<T>;
  errorCallback?: (error: unknown) => void;
  refetchCallback?: (response: T) => void;
  window?: Window;
  lastError?: unknown;
  payload?: unknown;
}) {
  const {
    callback,
    refetchCallback,
    properties,
    lastError,
    objectid,
    payload,
    errorCallback,
  } = prop;
  return new CachedRequest<T>(
    objectid,
    payload,
    typeof properties === "boolean" ? defaultCacheConfig : properties,
    callback,
    refetchCallback,
    errorCallback,
    window,
    lastError
  );
}

/**
 * @internal
 * Creates a requests cache instance
 */
export function useCache<T = unknown>() {
  return new RequestsCache<T>();
}

function isobject_(o: unknown) {
  return o !== null && typeof o === "object";
}

