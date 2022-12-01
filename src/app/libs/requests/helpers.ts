import { finalize, Observable } from "rxjs";
import { CacheType, RequestsCacheItemType } from "./caching";
import { selectRequest } from "./rx";
import { QueryState, State } from "./types";

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
 * @internal
 *
 * @param param0
 */
export function useRequestSelector([state$, cache]: [
  Observable<State>,
  CacheType<RequestsCacheItemType> | undefined
]) {
  return (argument: unknown) => {
    return state$.pipe(
      selectRequest(argument),
      finalize(() => {
        cache?.invalidate(argument);
      })
    );
  };
}

export function refetch(query: QueryState) {
  if (typeof query.id === "undefined" || query.id === null) {
    throw new Error(
      "Invalid query state, missing query `id` property, but required in instance of QueryState"
    );
  }
}
