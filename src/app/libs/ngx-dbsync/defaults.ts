import { DBSyncProviderConfigType } from "./types";

/**
 * @internal
 */
export const CHUNK_SIZE_LIMIT = 5;

/**
 * @internal
 */
export const QUERY_INTERVAL = 7000;

/**
 * @internal
 */
export const DEFAULT_QUERY_REFECTH_INTERVAL = 300000;


/**
 * @internal
 * Default response interceptor used by the dbsync provider
 */
export const defaultResponseInterceptor = (response: any) =>
  response["data"] ?? response;

/**
 * @internal
 * Default values of the db sync configuration
 */
export const defaultConfigs: DBSyncProviderConfigType = {
  debug: false,
  chunkSize: CHUNK_SIZE_LIMIT,
  queryInterval: QUERY_INTERVAL,
  responseInterceptor: defaultResponseInterceptor,
  // By default, when paginating we load 500 values per page
  pagination: {
    perPage: 500,
  },
  router: {
    autoload: false
  },
};
