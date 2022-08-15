import {
  filter,
  first,
  map,
  Observable,
  OperatorFunction,
  takeUntil,
  tap,
} from "rxjs";
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

export function selectRequest(argument: unknown) {
  return (observable$: Observable<State>) =>
    observable$.pipe(
      map((state) => state.requests.find((request) => request.id === argument)),
      filter((state) => typeof state !== "undefined" && state !== null)
    ) as Observable<RequestState<RequestArguments>>;
}
