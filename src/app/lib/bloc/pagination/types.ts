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
  pagination: <T = unknown>(
    path: string,
    _query: MapToPaginationQueryOutputType,
    hash: number
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
    _query: MapToPaginationQueryOutputType,
    hash: number
  ) => void;
};

export type QueryCachingConfig = Partial<QueryConfig>;
