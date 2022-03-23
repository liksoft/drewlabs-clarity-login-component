import { ModuleWithProviders, NgModule } from "@angular/core";
import { Paginator } from "./paginator";
import { PAGINATION_QUERY_CONFIG, PAGINATOR } from "./tokens";
import { QueryCachingConfig } from "./types";

type ModuleConfig = {
  queryConfig?: QueryCachingConfig;
};

@NgModule({})
export class PaginationModule {
  static forRoot(config: ModuleConfig): ModuleWithProviders<PaginationModule> {
    return {
      ngModule: PaginationModule,
      providers: [
        Paginator,
        {
          provide: PAGINATION_QUERY_CONFIG,
          useValue: config.queryConfig || {
            refetchInterval: 50000,
            refetchOnReconnect: true,
          },
        },
        {
          provide: PAGINATOR,
          useClass: Paginator,
        },
      ],
    };
  }
}
