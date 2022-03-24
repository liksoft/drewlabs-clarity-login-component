import { InjectionToken } from "@angular/core";
import { QueryCachingConfig } from "./types";

export const PAGINATION_QUERY_CONFIG = new InjectionToken<QueryCachingConfig>(
  "Configuration used internally by the paginator for query caching an retrying"
);

export const PAGINATOR = new InjectionToken<any>(
  'RESSOURCES PAGINATION INSTANCE'
);

export const PAGINATOR_INTERNAL_CLIENT = new InjectionToken(
  'PAGINATOR SERVICE INTERNAL CLIENT INSTANCE'
);
