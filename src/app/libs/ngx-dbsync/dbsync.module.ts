import { CommonModule } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { RESTQueryProvider } from "./dbsync-query.provider";
import { AzlDbValuePipe } from "./dbsync.pipe";
import { DbSyncRouter } from "./dbsync.router";
import { DBSyncProvider } from "./dbsync.service";
import { defaultConfigs } from "./defaults";
import {
  DBSyncProviderConfigType,
  DBSYNC_PROVIDER_CONFIG,
  DBSYNC_QUERY_CLIENT
} from "./types";

@NgModule({
  imports: [CommonModule],
  declarations: [AzlDbValuePipe],
  exports: [AzlDbValuePipe],
  providers: [
    RESTQueryProvider,
    AzlDbValuePipe,
    {
      provide: DBSYNC_QUERY_CLIENT,
      useFactory: (http: HttpClient, config: DBSyncProviderConfigType) => {
        return new RESTQueryProvider(http, config);
      },
      deps: [HttpClient, DBSYNC_PROVIDER_CONFIG]
    },
    
  ],
})
export class DBSyncModule {
  static forRoot(
    config: DBSyncProviderConfigType
  ): ModuleWithProviders<DBSyncModule> {
    return {
      ngModule: DBSyncModule,
      providers: [
        DBSyncProvider,
        DbSyncRouter,
        {
          provide: DBSYNC_PROVIDER_CONFIG,
          useValue: {
            ...config,
            responseInterceptor:
              config.responseInterceptor ?? defaultConfigs.responseInterceptor,
            pagination: config.pagination ?? defaultConfigs.pagination,
            router: config.router ?? defaultConfigs.router,
          } as DBSyncProviderConfigType,
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: (router: DbSyncRouter) => {
            return async () => {
              if (config.router && Boolean(config.router?.autoload) === true) {
                router.subscribe();
              }
              return Promise.resolve(true);
            };
          },
          deps: [DbSyncRouter],
        },
      ],
    };
  }
}
