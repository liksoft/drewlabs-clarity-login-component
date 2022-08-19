import { distinctUntilChanged, filter, first, map, Observable, OperatorFunction } from "rxjs";
import { RequestArguments, RequestState, State } from "./types";

/**
 * @internal
 * @param predicate
 */
export function firstWhere<T = unknown>(predicate: (value: T) => boolean) {
  return (observable$: Observable<T>) =>
    observable$.pipe(filter(predicate), first());
}

/**
 * @description RxJS operator that returns the api response from
 */
export function apiResponse<TResponse>(
  project?: (request: RequestState) => TResponse
): OperatorFunction<RequestState, TResponse> {
  return (observable$: Observable<RequestState>) =>
    observable$.pipe(
      filter((request) => !request.pending),
      distinctUntilChanged(),
      project ? map(project) : map((request) => request.response as TResponse)
    );
}

/**
 * Query [body] stream of the query response if any or returns the
 * entire response if none
 *
 * @param key
 */
export function apiResponseBody<TBody = unknown>(
  key?: string
): OperatorFunction<RequestState, TBody> {
  return (observable$: Observable<RequestState>) =>
    observable$.pipe(
      apiResponse((request) => {
        key = key ?? "body";
        const response = request.response as Record<string, any>;
        return response && typeof response === "object" && key in response
          ? response[key]
          : response;
      })
    );
}

export function selectRequest(argument: unknown) {
  return (observable$: Observable<State>) =>
    observable$.pipe(
      map((state) => state.requests.find((request) => request.id === argument)),
      filter((state) => typeof state !== "undefined" && state !== null)
    ) as Observable<RequestState<RequestArguments>>;
}
