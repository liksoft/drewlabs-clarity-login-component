import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { useQuery } from "@azlabsjs/ngx-query";
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
import { defaultSettingConfigs } from "./defaults";
import {
  QueryConfigType,
  SETTINGS_QUERY_CLIENT,
  SETTING_PROVIDER_CONFIG,
  SettingProviderConfigType,
  SettingsProviderType,
  SettingsQueryProviderType,
  SliceQueryType,
} from "./types";

@Injectable({
  providedIn: "root",
})
export class SettingsProvider implements SettingsProviderType, OnDestroy {

  // #region class properties
  private _settings = new BehaviorSubject(
    new Map<string, Record<string, unknown>[]>()
  );
  get settings() {
    return this._settings.asObservable();
  }
  private _destroy$ = new Subject<void>();
  // #region class properties

  constructor(
    @Inject(SETTINGS_QUERY_CLIENT)
    private queryProvider: SettingsQueryProviderType,
    @Inject(SETTING_PROVIDER_CONFIG)
    @Optional()
    private config: SettingProviderConfigType = defaultSettingConfigs
  ) {
    // For debugging purpose
    if (this.config.debug) {
      this.settings
        .pipe(
          takeUntil(this._destroy$),
          tap((state) => {
            console.log("Settings state: ", state);
          })
        )
        .subscribe();
    }
  }

  loadSlice(query: SliceQueryType) {
    // For better performance and in order not to load the server
    // with request, we will create a chunk of query parameters
    // We default the chunk size to 5, if configuration instance is not injected
    const chunks = this.chunkQueryParams(query, this.config?.chunkSize ?? 5);
    let _interval = 0;
    // For the first chunk we do not provide any delay
    const requests = [
      forkJoin(chunks[0].map((param) => this.querySlice(param))),
    ];
    for (const chunk of chunks.slice(1)) {
      _interval += this.config?.queryInterval ?? 300000;
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
  private chunkQueryParams<T>(list: T[], size: number): T[][] {
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
    const { method, endpoint, params, responseInterceptor, key } = param;
    return useQuery(
      this.queryProvider,
      method ?? "GET",
      endpoint,
      this.createResponseCallback(key).bind(this),
      params,
      responseInterceptor ?? this.config?.responseInterceptor
    );
  }

  /**
   * Creates a callback that is invoked whenever a new slice of 
   * data is loaded from the backend server. It will notify the settings
   * store whenever the data became available
   */
  createResponseCallback(key: string) {
    return (items: Record<string, unknown>[], partial: boolean) => {
      const cache = this._settings.getValue();
      if (partial && cache.has(key) && (cache.get(key) ?? []).length !== 0) {
        console.log('Updating store with partially loaded values, while store does not have data...');
        return;
      }
      this._settings.next(cache.set(key, items));
    };
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
