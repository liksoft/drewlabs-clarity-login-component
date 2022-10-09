import {
  first,
  isObservable,
  map,
  Observable,
  of,
  OperatorFunction,
} from "rxjs";
import { HTTPRequestMethods } from "../../http";
import { apiResponse, apiResponseBody } from "../../rx";
import {
  BaseQueryType,
  QueryProviderType,
  QueryType,
  RequestArguments,
  RequestState,
} from "../../types";
import { createQueryCreator, parseQueryArguments } from "./internal";
import { CacheQueryProviderType, QueryStateLeastParameters } from "./types";

type UseQueryReturnType<T> = T extends QueryProviderType<any>
  ? ReturnType<T["query"]>
  : Observable<unknown>;

/**
 * Create query instance that caches (if required by user) it arguments
 * and replay / refetch it based on the interval defined by the library user
 *
 * @param params
 * @param args
 */
export const useQuery = <T, TResponse = unknown>(
  params: T,
  ...args: [...QueryStateLeastParameters<T>]
) => {
  const [_query, _arguments, observe] = parseQueryArguments(params, args);
  let _observe = observe as unknown;
  const result = createQueryCreator()(_query as any, ..._arguments);
  const _params = params as unknown;
  if (typeof (_params as CacheQueryProviderType).query === "function") {
    _observe =
      observe ?? (_params as CacheQueryProviderType).cacheConfig.observe;
  }
  return (
    (!isObservable(result) ? of(result) : result) as Observable<
      RequestState<RequestArguments>
    >
  ).pipe(
    _observe === "response"
      ? apiResponse<TResponse>()
      : ((_observe === "body"
          ? apiResponseBody()
          : map((state) => state)) as OperatorFunction<RequestState, unknown>)
  ) as UseQueryReturnType<T>;
};

/**
 * Functional interface for sending HTTP Query using POST verb.
 * Unlike {@see createQuery } functional interface, it does not
 * reexecute the query on an interval basics, but will retry
 * 3 times the query if it fails.
 *
 * @param query
 */
export const useHTTPPostQuery = (
  query: Omit<BaseQueryType<HTTPRequestMethods>, "method">
) =>
  useQuery(
    {
      ...query,
      method: "POST",
    } as QueryType,
    { retries: 3, refetchInterval: undefined }
  ).pipe(first());

/**
 * Functional interface for sending HTTP Query using PUT verb.
 * Unlike {@see useQuery } functional interface, it does not
 * reexecute the query on an interval basics, but will retry
 * 3 times the query if it fails.
 *
 * @param query
 */
export const useHTTPPutQuery = (
  query: Omit<BaseQueryType<HTTPRequestMethods>, "method">
) =>
  useQuery(
    {
      ...query,
      method: "PUT",
    } as QueryType,
    { retries: 3, refetchInterval: undefined }
  ).pipe(first());

/**
 * Functional interface for sending HTTP Query using DELETE verb.
 * Unlike {@see useQuery } functional interface, it does not
 * reexecute the query on an interval basics, but will retry
 * 3 times the query if it fails.
 *
 * @param query
 */
export const useHTTPDeleteQuery = (
  query: Omit<BaseQueryType<HTTPRequestMethods>, "method">
) =>
  useQuery(
    {
      ...query,
      method: "DELETE",
    } as QueryType,
    { retries: 3, refetchInterval: undefined }
  ).pipe(first());
