import { InjectionToken } from "@angular/core";
import { AnalyticsAppMetaData, NgxAnalyticsPlugins } from './types';

export const NGX_ANALITICS_APP = new InjectionToken<AnalyticsAppMetaData>(
  "Analytics app metadata"
);

export const NGX_ANALYTICS_PLUGINS = new InjectionToken<NgxAnalyticsPlugins[]>(
  "Analytics Plugins"
);
