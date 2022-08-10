import { useRxEffect } from "@azlabsjs/rx-hooks";
import { deepEqual } from "@azlabsjs/utilities";
import {
  asyncScheduler,
  catchError,
  EMPTY,
  first,
  from,
  interval,
  isObservable,
  lastValueFrom,
  mergeMap,
  Observable,
  ObservableInput,
  observeOn,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { CacheQueryConfig } from "./types";

// TODO : Think about implementation taking in account staleTime and Cache Time

export class RequestsCache {
  /**
   * @internal
   *
   * State of the cache instance
   */
  private _state: CachedRequest[] = [];

  get length() {
    return this._state.length;
  }

  clear() {
    this._state = [];
  }

  add(item: CachedRequest): void {
    this._state = [item, ...(this._state ?? [])];
  }

  //#region Miscellanous
  at(index: number) {
    return index === -1 || index > this._state.length - 1
      ? undefined
      : this._state[index];
  }

  removeAt(index: number) {
    const items = [...this._state];
    const values = items.splice(index, 1);
    // When removing element from cache we call destroy method
    // in order to unsubscribe to any observable being run internally
    for (const request of values) {
      request.destroy();
    }
    this._state = items;
  }

  indexOf(argument: unknown) {
    const index =
      typeof argument === "string"
        ? this._state.findIndex((request) => request.id === argument)
        : this._state.findIndex((request) =>
            deepEqual(request.payload, argument)
          );
    return index;
  }
  //#region Miscellanous
}

export class CachedRequest<T = unknown> {
  //#region Properties definitions
  private tries = 0;
  private lastError!: unknown;
  private lastResponse!: unknown;
  private readonly clearRefetch$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();
  private _expiresAt!: Date | undefined;
  private _isStale: boolean = false;
  //#endregion Properties definitions

  private onWindowReconnect = () => {
    this.refetch();
  };

  private onWindowFocus = () => {
    this.refetch();
  };

  //#region Properties accessors
  get id() {
    return this._id;
  }
  get payload() {
    return this._payload;
  }

  get isStale() {
    return this._isStale;
  }

  get response() {
    return this.lastResponse;
  }

  get retryState() {
    return {
      tries: this.tries,
      lastError: this.lastError,
      payload: this.payload,
      id: this.id,
    };
  }
  //#endregion Properties accessors

  // Creates an instance of {@see CachedRequest} class
  constructor(
    private _id: string,
    private _payload: unknown,
    private properties: CacheQueryConfig,
    private readonly callback: () => ObservableInput<T>,
    private refetchCallback: (response: T) => void,
    private errorCallback?: (error: unknown) => void,
    defaultWindow?: Window,
    lastError?: unknown
  ) {
    const { refetchInterval, refetchOnReconnect, refetchOnWindowFocus } =
      this.properties;

    // Mark the data as state
    this.markAsStale();

    // Configure the refresh interval
    if (refetchInterval) {
      this.configureRefreshInterval(refetchInterval);
    }
    if (refetchOnReconnect) {
      // TODO: Inject the window instance in the constructor and use it in the current call
      this.refetchOnReconnect(defaultWindow);
    }
    if (refetchOnWindowFocus) {
      // TODO: Inject the window instance in the constructor and use it in the current call
      this.refetchOnFocus(defaultWindow);
    }

    if (typeof lastError !== "undefined" && lastError !== null) {
      this.lastError = lastError;
      this.retry();
    }
  }

  private configureRefreshInterval(
    refetchInterval?: number | Observable<unknown>
  ) {
    if (typeof refetchInterval === "undefined" || refetchInterval === null) {
      return;
    }
    if (!this.isStale) {
      return;
    }
    (isObservable(refetchInterval)
      ? refetchInterval
      : interval(refetchInterval)
    )
      .pipe(
        mergeMap(() => this.doRequest()),
        takeUntil(this.clearRefetch$),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private refetchOnFocus(defaultWindow?: Window) {
    defaultWindow?.addEventListener("focus", this.onWindowFocus);
  }

  private refetchOnReconnect(defaultWindow?: Window) {
    defaultWindow?.addEventListener("online", this.onWindowReconnect);
  }

  private doRetry() {
    const { retryDelay } = this.properties;
    useRxEffect(
      interval(
        typeof retryDelay === "function"
          ? retryDelay(this.tries)
          : retryDelay ?? 1000
      ).pipe(
        first(),
        mergeMap(() => this.doRequest())
      )
    );
  }

  private doRequest() {
    return from(this.callback.apply(null)).pipe(
      observeOn(asyncScheduler),
      catchError((error) => {
        this.lastError = error;
        // If the tries is more than or equal to the configured tries, we trigger an error
        // call on the cached instance
        if (!this.canRetry() && typeof this.errorCallback === "function") {
          this.errorCallback(error);
        } else {
          // TODO : Retry the request if it fails
          this.retry();
        }
        // Returns an empty Observable to swallow the error
        return EMPTY;
      }),
      tap((response) => {
        this.lastError = undefined;
        this.lastResponse = response;
        // Unmark the request as stale
        this._isStale = false;
        this.refetchCallback(response);
        // Mark the request as state based on the staleTime configuration
        this.markAsStale();
      })
    );
  }

  private markAsStale() {
    if (
      typeof this.properties.staleTime === "undefined" ||
      this.properties.staleTime ||
      this.properties.staleTime === 0
    ) {
      this._isStale = true;
    } else {
      interval(this.properties.staleTime)
        .pipe(
          first(),
          tap(() => (this._isStale = true)),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  private canRetry() {
    return (
      (typeof this.properties.retries === "number" &&
        this.tries <= this.properties.retries) ||
      (typeof this.properties.retries === "function" &&
        this.properties.retries(this.tries, this.lastError))
    );
  }

  setError(error: unknown) {
    this.lastError = error;
  }

  setExpiresAt() {
    const date = new Date();
    date.setMilliseconds(
      date.getMilliseconds() + (this.properties?.cacheTime ?? 500000)
    );
    this._expiresAt = date;
  }

  expires() {
    return (
      typeof this._expiresAt !== "undefined" &&
      this._expiresAt !== null &&
      this._expiresAt.getTime() - new Date().getTime() < 0
    );
  }

  // Handle retry action on the cached request
  retry() {
    if (this.canRetry()) {
      this.tries += 1;
      return this.doRetry();
    }
    // Stop refetch observable listener
    this.clearRefetch$!.next();
  }

  async refetch() {
    // If the data is not marked as stale, we don't update
    // the state of the data
    if (!this.isStale) {
      return;
    }
    // Clear refetch to stop the current refetch observable
    this.clearRefetch$!.next();
    const { refetchInterval } = this.properties;
    // Do a request request to update the state
    await lastValueFrom(this.doRequest());
    // Reconfigure the refetch action
    if (refetchInterval) {
      this.configureRefreshInterval(refetchInterval);
    }
  }

  destroy() {
    window?.removeEventListener("online", this.onWindowReconnect);
    window?.removeEventListener("focus", this.onWindowFocus);
    this.clearRefetch$!.next();
    this.destroy$.next();
  }
}
