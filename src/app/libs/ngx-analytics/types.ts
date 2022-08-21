import { GoogleAnalyticsOptions } from "@analytics/google-analytics";
import { AnalyticsPlugin, PageData } from "analytics";

/**
 * @internal
 */
export type AnalyticPageData<T extends string> = PageData<T>;

export type AnalyticsInterface = {
  /**
   * Tracks an application page history an log it to analytics server
   *
   * @param data
   * @param options
   */
  trackPage<T extends string = string>(
    data?: AnalyticPageData<T>,
    options?: unknown
  ): Promise<unknown>;

  /**
   * Tracks a custom application event and logs it to the analytics server
   *
   * @param event
   * @param payload
   * @param options
   */
  trackEvent<TPayload = unknown>(
    event: string,
    payload?: TPayload,
    options?: unknown
  ): Promise<unknown>;

  /**
   * Identify application user and track it records to analytics server
   *
   * @param id
   * @param payload
   * @param options
   */
  trackIdentity<TIdentityPayload = unknown>(
    id: string,
    payload?: TIdentityPayload,
    options?: unknown
  ): Promise<unknown>;
};

/**
 * @internal
 */
export type NgxAnalyticsPlugins = AnalyticsPlugin;

/**
 * @internal
 */
export type AnalyticsAppMetaData = {
  name: string;
  version?: string;
};

/**
 * @internal
 */
export type BaseNgxAnalyticsConfig = {
  metadata: AnalyticsAppMetaData;
  trackOnAppInit: boolean;
};
/**
 * @internal
 */
export type DefaultNgxAnalyticsConfig = BaseNgxAnalyticsConfig & {
  plugins: NgxAnalyticsPlugins[];
};

/**
 * @internal
 */
export type FallbackNgxAnalyticsConfig = BaseNgxAnalyticsConfig & {
  google: string | GoogleAnalyticsOptions;
};

/**
 * @description Module configuration type definition
 */
export type NgxAnalyticsConfigs =
  | DefaultNgxAnalyticsConfig
  | FallbackNgxAnalyticsConfig;
