import { filter, first, map, Observable, OperatorFunction, tap } from "rxjs";
import { RequestState } from "./types";

export function firstWhere<T = unknown>(predicate: (value: T) => boolean) {
  return (observable$: Observable<T>) =>
    observable$.pipe(filter(predicate), first());
}

/**
 * RxJS operator that returns the api response from
 */
export function apiResponse<TResponse = unknown>(
  project?: (request: RequestState) => TResponse
): OperatorFunction<RequestState, TResponse> {
  return (observable$: Observable<RequestState>) =>
    observable$.pipe(
      filter((request) => !request.pending),
      first(),
      project ? map(project) : map((request) => request.response as TResponse)
    );
}
