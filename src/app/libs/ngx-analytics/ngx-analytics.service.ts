import { Inject, Injectable } from "@angular/core";
import { Analytics, AnalyticsInstance } from "analytics";
import { NGX_ANALITICS_APP, NGX_ANALYTICS_PLUGINS } from "./tokens";
import {
  AnalyticPageData,
  AnalyticsAppMetaData,
  AnalyticsInterface,
  NgxAnalyticsPlugins,
} from "./types";

@Injectable()
export class NgxAnalytics implements AnalyticsInterface {
  //#region Class properties
  private readonly analytics!: AnalyticsInstance;
  //#endregion Class properties

  // Creates an instance of the NgxAnalytics service
  public constructor(
    @Inject(NGX_ANALITICS_APP) metadata: AnalyticsAppMetaData,
    @Inject(NGX_ANALYTICS_PLUGINS) plugins: NgxAnalyticsPlugins[]
  ) {
    const { name, version } = metadata;
    this.analytics = Analytics({
      app: name,
      version,
      plugins: plugins,
    });
  }
  trackIdentity<TIdentityPayload = unknown>(
    id: string,
    payload?: TIdentityPayload | undefined,
    options?: unknown
  ): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      this.analytics.identify(id, payload, options, (...args: unknown[]) => {
        resolve(true);
      });
    });
  }

  trackPage<T extends string = string>(
    data?: AnalyticPageData<T>,
    options?: unknown
  ): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      this.analytics.page(data, options, (...args: unknown[]) => {
        resolve(true);
      });
    });
  }

  trackEvent<TPayload = unknown>(
    event: string,
    payload?: TPayload,
    options?: unknown
  ) {
    return new Promise<unknown>((resolve) => {
      this.analytics.track(event, payload, options, (...args: unknown[]) => {
        resolve(true);
      });
    });
  }
}
