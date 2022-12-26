const CHUNK_SIZE_LIMIT = 5;
const QUERY_INTERVAL = 30000;

/**
 * Default response interceptor used by the setting provider
 */
export const defaultResponseInterceptor = (response: any) =>
  response["data"] ?? response;

/**
 * Default values of the setting configuration
 */
export const defaultSettingConfigs = {
  debug: false,
  chunkSize: CHUNK_SIZE_LIMIT,
  queryInterval: QUERY_INTERVAL,
  responseInterceptor: defaultResponseInterceptor,
  // By default, when paginating we load 500 values per page
  pagination: {
    perPage: 500,
  },
};
