import { QueryConfig, QueryOutput } from "rx-query";
import { Observable } from "rxjs";
import { MapToPaginationQueryOutputType } from "../../core/pagination";

export type QueryOutputType<Result = unknown> = QueryOutput<Result>;

export type PaginatorType = {
  /**
   * Send a request pagination request to the handler/server
   *
   * @param path
   * @param _query
   * @param hash
   */
  paginate: <T = unknown>(
    path: string,
    _query: MapToPaginationQueryOutputType,
    // Overload the default configuration of the Paginator
    queryConfig?: QueryCachingConfig
  ) => Observable<QueryOutputType<T>>;

  /**
   * Manually refresh the state of the query in the query cache. It internally
   * forces the pagination query provider to send the request in the background
   *
   * @param path
   * @param _query
   * @param hash
   * @returns
   */
  refresh: (
    path: string,
    _query: MapToPaginationQueryOutputType
  ) => void;
};

export type QueryCachingConfig = Partial<QueryConfig>;

/**
 * @description Type definition of Paginator internal client used
 * to query paginable data
 */
export type PaginatorInternalClient =
  | {
      /**
       * @param resource  Path to the ressource collection. For Rest API requests this represent the REST resource endpoint
       * @param options   Options object used as request parameters
       */
      get: <T, OptionType extends object = { [index: string]: any }>(
        resource: string,
        options: OptionType
      ) => Observable<T> | Promise<T>;
    }
  | (<T, OptionType extends object = { [index: string]: any }>(
      resource: string,
      options: OptionType
    ) => Observable<T> | Promise<T>);
