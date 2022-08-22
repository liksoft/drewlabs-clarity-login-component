import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Provider,
} from "@angular/core";
import { NgxAnalytics } from "./ngx-analytics.service";
import { NGX_ANALITICS_APP, NGX_ANALYTICS_PLUGINS } from "./tokens";
import {
  DefaultNgxAnalyticsConfig,
  FallbackNgxAnalyticsConfig,
  NgxAnalyticsConfigs,
} from "./types";
import googleAnalytics, {
  GoogleAnalyticsOptions,
} from "@analytics/google-analytics";
import { NgxAnalyticsComponent } from "./ngx-analytics.component";
import { NgxAnalyticsEventsDirective } from "./ngx-analytics-events.directive";
import { NgxAnalyticsNavigationDirective } from "./ngx-analytics-navigation.directive";
import { CommonModule } from "@angular/common";
import { NgxRouterAnalytics } from "./ngx-router-analytics.service";

export function appInitializers(
  routerAnalytics: NgxRouterAnalytics
): Promise<unknown> {
  return new Promise<void>((resolve, reject) => {
    routerAnalytics.subscribe();
    resolve();
  });
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgxAnalyticsComponent,
    NgxAnalyticsEventsDirective,
    NgxAnalyticsNavigationDirective,
  ],
  exports: [
    NgxAnalyticsComponent,
    NgxAnalyticsEventsDirective,
    NgxAnalyticsNavigationDirective,
  ],
  providers: [NgxAnalytics],
})
export class NgxAnalyticsModule {
  static forRoot(
    props: NgxAnalyticsConfigs
  ): ModuleWithProviders<NgxAnalyticsModule> {
    const providers: Provider[] = [
      NgxRouterAnalytics,
      {
        provide: NGX_ANALITICS_APP,
        useFactory: () => {
          const { metadata } = props;
          return (
            metadata ?? {
              name: "TESTAPP",
            }
          );
        },
      },
      {
        provide: NGX_ANALYTICS_PLUGINS,
        useFactory: () => {
          return (props as DefaultNgxAnalyticsConfig).plugins
            ? (props as DefaultNgxAnalyticsConfig).plugins
            : [
                typeof (props as FallbackNgxAnalyticsConfig).google ===
                  "string" ||
                Array.isArray((props as FallbackNgxAnalyticsConfig).google)
                  ? googleAnalytics({
                      measurementIds: (props as FallbackNgxAnalyticsConfig)
                        .google as string[] | string,
                    })
                  : googleAnalytics(
                      (props as FallbackNgxAnalyticsConfig)
                        .google as GoogleAnalyticsOptions
                    ),
              ];
        },
      },
    ];

    if (props.trackOnAppInit) {
      providers.push({
        provide: APP_INITIALIZER,
        useFactory: () => appInitializers,
        multi: true,
        deps: [NgxRouterAnalytics],
      });
    }
    return {
      ngModule: NgxAnalyticsModule,
      providers,
    };
  }
}
