import { Inject, Injectable, Optional } from "@angular/core";
import { of } from "rxjs";
import { PaginatorInternalClient, QueryCachingConfig } from "./types";
import { PAGINATION_QUERY_CONFIG, PAGINATOR_INTERNAL_CLIENT } from "./tokens";

// function isPromise(promise: unknown) {
//   return (
//     (promise &&
//       Object.prototype.toString.call(promise) === "[object Promise]") ||
//     Boolean(
//       promise &&
//         typeof promise === "object" &&
//         typeof (promise as any).then === "function"
//     )
//   );
// }

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
// export function computeHash(
//   query: MapToPaginationQueryOutputType | string
// ): number {
//   const queryType = typeof query;
//   if (queryType === "object") {
//     query = JSON.stringify(query);
//   }
//   if (null === query || queryType === "undefined") {
//     return 0;
//   }
//   let hashCode_ = hashCode(query as string);
//   hashCode_ = (hashCode_ ^ (hashCode_ >>> 7) ^ (hashCode_ >>> 4)) & 0x7fffffff;
//   return hashCode_;
// }

@Injectable({
  providedIn: "root",
})
export class Paginator {
  // @interal - Provide a memoization implementation arround hash computing implementation
  // private readonly computeHash_ = memoize(computeHash);

  /**
   *
   * @param client
   */
  constructor(
    @Inject(PAGINATOR_INTERNAL_CLIENT) private client: PaginatorInternalClient,
    @Inject(PAGINATION_QUERY_CONFIG)
    @Optional()
    private queryConfig?: QueryCachingConfig
  ) {}

  paginate<T>(
    path: string,
    // _query: MapToPaginationQueryOutputType,
    // Overload the default configuration of the Paginator
    queryConfig?: QueryCachingConfig
  ) {
    return of();
    // return query(
    //   `${path}`,
    //   this.computeHash_(_query),
    //   () => {
    //     const result =
    //       typeof this.client === "function"
    //         ? this.client.call(this, path, _query)
    //         : this.client.get(path, _query);
    //     return isPromise(result)
    //       ? from(result)
    //       : (result as Observable<unknown>);
    //   },
    //   queryConfig || this.queryConfig
    // ) as Observable<QueryOutputType<T>>;
  }

  // refresh(path: string, _query: MapToPaginationQueryOutputType) {
  //   return refreshQuery(`${path}`, this.computeHash_(_query));
  // }
}
