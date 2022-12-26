import { InjectionToken } from "@angular/core";
import { QueryProviderType } from "@azlabsjs/rx-query";
import { Observable } from "rxjs";

export type SettingProviderConfigType = {
  debug: boolean;
  chunkSize?: number;
  resultItemsKey?: string
};

export const SETTINGS_QUERY_CLIENT = new InjectionToken<QueryProviderType>(
  "Setting query provider type"
);

export const SETTING_PROVIDER_CONFIG =
  new InjectionToken<SettingProviderConfigType>(
    "Provides setting provider configuration values"
  );

export type ResponseInterceptorType = <T extends any>(
  response: T
) => Record<string, unknown>;

export type QueryConfigType = {
  key: string;
  endpoint: string;
  method?: string;
  params?: Record<string, string>;
  responseInterceptor?: ResponseInterceptorType;
};

/**
 * Query object for selecting setting values from the
 * query data source
 */
export type SliceQueryType = QueryConfigType[];

export interface SettingsProviderType {
  /**
   * Settings dictionnary readonly property
   */
  readonly settings: Observable<Map<string, Record<string, unknown>[]>>;

  /**
   * Used by the settings provider to load a slice of the
   * application settings at runtime. It's beneficiary for
   * composed application for load settings only when a
   * feature module is loaded
   *
   * @param query
   */
  loadSlice(query: SliceQueryType): void;
}
