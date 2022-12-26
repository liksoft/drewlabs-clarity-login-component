import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { useQuery } from "@azlabsjs/ngx-query";
import { QueryProviderType } from "@azlabsjs/rx-query";
import {
  BehaviorSubject,
  Subject,
  forkJoin,
  interval,
  mergeMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import {
  QueryConfigType,
  ResponseInterceptorType,
  SETTINGS_QUERY_CLIENT,
  SETTING_PROVIDER_CONFIG,
  SettingProviderConfigType,
  SettingsProviderType,
  SliceQueryType,
} from "./types";

const CHUNK_SIZE_LIMIT = 5;
const QUERY_INTERVAL = 30000;

@Injectable({
  providedIn: "root",
})
export class SettingsProvider implements SettingsProviderType, OnDestroy {
  /**
   * @internal
   */
  private _settings = new BehaviorSubject(
    new Map<string, Record<string, unknown>[]>()
  );
  get settings() {
    return this._settings.asObservable();
  }
  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(SETTINGS_QUERY_CLIENT)
    private queryProvider: QueryProviderType<
      [
        string,
        string,
        Record<string, string> | undefined,
        ResponseInterceptorType | undefined
      ]
    >,
    @Inject(SETTING_PROVIDER_CONFIG)
    @Optional()
    private config: SettingProviderConfigType = {
      debug: false,
      chunkSize: CHUNK_SIZE_LIMIT,
      resultItemsKey: "data",
    }
  ) {
    // For debugging purpose
    if (this.config.debug) {
      this.settings
        .pipe(
          takeUntil(this._destroy$),
          tap((state) => {
            console.log("Setting state: ", state);
          })
        )
        .subscribe();
    }
  }

  loadSlice(query: SliceQueryType) {
    // For better performance and in order not to load the server
    // with request, we will create a chunk of query parameters
    const chunks = this.chunkQueryParams(query, this.config?.chunkSize);
    let _interval = 0;
    // For the first chunk we do not provide any delay
    const first = chunks[0];
    const requests = [forkJoin(first.map((param) => this.querySlice(param)))];
    const least = chunks.slice(1);
    for (const chunk of least) {
      _interval += QUERY_INTERVAL;
      const request = interval(_interval).pipe(
        take(1),
        mergeMap(() => forkJoin(chunk.map((param) => this.querySlice(param))))
      );
      requests.push(request);
    }
    forkJoin(requests).pipe(takeUntil(this._destroy$)).subscribe();
  }

  /**
   * Chuck the query parameters in a predefined size
   */
  private chunkQueryParams<T>(
    list: T[],
    size: number = CHUNK_SIZE_LIMIT
  ): T[][] {
    size = Math.min(CHUNK_SIZE_LIMIT, size);
    const temp = [];
    for (let index = 0; index < list.length; index += size) {
      temp.push(list.slice(index, index + size));
    }
    return temp;
  }

  /**
   * Send Query for a given setting query parameter using the query
   * cache provider
   */
  private querySlice(param: QueryConfigType) {
    const { method, endpoint, params, responseInterceptor } = param;
    return useQuery(
      this.queryProvider,
      method ?? "GET",
      endpoint,
      params,
      responseInterceptor
    ).pipe(
      tap((state) => {
        if (state) {
          const items = state[this.config?.resultItemsKey ?? "data"] ?? state;
          const cache = this._settings.getValue();
          const entries = [
            ...(cache.get(param.key) ?? []),
            ...(items as Record<string, unknown>[]),
          ];
          this._settings.next(cache.set(param.key, entries));
        }
      })
    );
  }

  /**
   * {@inheritdoc}
   *
   * Provides object destruction implementation
   */
  ngOnDestroy() {
    this._destroy$.next();
  }
}
