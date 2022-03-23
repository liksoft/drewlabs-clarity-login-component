import { Inject, Injectable } from "@angular/core";
import { hashCode } from "@iazlabs/strings";
import { Client, HTTP_CLIENT } from "../../core/http";
import { MapToPaginationQueryOutputType } from "../../core/pagination";
import { query, refreshQuery } from "rx-query";
import { Observable } from "rxjs";
import { PaginatorType, QueryCachingConfig, QueryOutputType } from "./types";
import { PAGINATION_QUERY_CONFIG } from "./tokens";

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
export function computeHash(
  query: MapToPaginationQueryOutputType | string
): number {
  const queryType = typeof query;
  if (queryType === "object") {
    query = JSON.stringify(query);
  }
  if (null === query || queryType === "undefined") {
    return 0;
  }
  return hashCode(query as string);
}

@Injectable({
  providedIn: "root",
})
export class Paginator implements PaginatorType {
  /**
   *
   * @param client
   */
  constructor(
    @Inject(HTTP_CLIENT) private client: Client,
    @Inject(PAGINATION_QUERY_CONFIG) private queryConfig: QueryCachingConfig
  ) {}

  pagination<T>(
    path: string,
    _query: MapToPaginationQueryOutputType,
    hash: number
  ) {
    return query(
      `${path}/:hash=${hash}`,
      _query,
      () => {
        return this.client.get(path, _query);
      },
      this.queryConfig
    ) as Observable<QueryOutputType<T>>;
  }

  refresh(path: string, _query: MapToPaginationQueryOutputType, hash: number) {
    return refreshQuery(`${path}/:hash=${hash}`, _query);
  }
}
