import { QueryConfig, QueryOutput } from "rx-query";
import { Observable } from "rxjs";
import { MapToPaginationQueryOutputType } from "../../../core/pagination";

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

  /**
   * Compute the hash code of user provide http query
   *
   * Note: When passing object instance insure it's a prototype
   * based object as the function uses JSON.stringify() API for
   * serialization. Therefore non enumerable properties of the object
   * must not be included in output value
   *
   * @param query
   */
  computeHash: (query: MapToPaginationQueryOutputType | string) => number;
};

export type QueryCachingConfig = Partial<QueryConfig>;
