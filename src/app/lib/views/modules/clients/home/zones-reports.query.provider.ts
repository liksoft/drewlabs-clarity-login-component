import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { JSArray } from "@azlabsjs/collections";
import { AzlCacheProvider } from "@azlabsjs/ngx-azl-cache";
import { PaginateResult } from "@azlabsjs/ngx-clr-smart-grid";
import { ProvidesQuery } from "@azlabsjs/ngx-query";
import { QueryProviderType } from "@azlabsjs/rx-query";
import {
  filter,
  forkJoin,
  interval,
  map,
  mergeMap,
  Observable,
  Subject,
  take,
  takeUntil
} from "rxjs";
import { configsDbNames } from "src/app/lib/bloc";
import { ZonesType } from "../types";

/**
 * @internal
 */
export const CHUNK_SIZE_LIMIT = 15;

/**
 * @internal
 */
export const QUERY_INTERVAL = 7000;

@Injectable()
@ProvidesQuery({
  observe: "response",
  refetchInterval: 600000,
})
export class ZonesReportQueryProvider
  implements QueryProviderType<[string, string]>, OnDestroy
{
  private _destroy$ = new Subject<void>();

  //
  constructor(private http: HttpClient, private cache: AzlCacheProvider) {}

  query(zonesURL: string, membersURL: string) {
    return this.cache.state$.pipe(
      map((state) => state.get(configsDbNames.zones) as ZonesType[]),
      filter((zones) => (zones ?? []).length !== 0),
      mergeMap((state) => this.queryTotalMembersPerZones(state, membersURL))
    );
  }

  private queryTotalMembersPerZones(state: ZonesType[], membersURL: string) {
    //  Block the maximum of request to 15 request per chunk to avoid
    // server overload and rate limit request errors
    const chunks = JSArray.chunk(state, Math.min(CHUNK_SIZE_LIMIT, 15));
    let _interval = 0;
    // For the first chunk we do not provide any delay
    const request$ = [
      forkJoin(
        chunks[0].map((param) =>
          this.sendGetMemberCountRequest(membersURL, param.label, param.id)
        )
      ),
    ];
    for (const chunk of chunks.slice(1)) {
      // We assume each request takes a maximum of 1 seconds, we use a query interval of number
      // of chunks divided by 2 for each chunk
      _interval += (CHUNK_SIZE_LIMIT * 1000) / 2;
      request$.push(
        interval(_interval).pipe(
          take(1),
          mergeMap(() =>
            forkJoin(
              chunk.map((param) =>
                this.sendGetMemberCountRequest(
                  membersURL,
                  param.label,
                  param.id
                )
              )
            )
          )
        )
      );
    }
    return forkJoin(request$).pipe(
      takeUntil(this._destroy$),
      map(state => state.flat())
    );
  }

  private sendGetMemberCountRequest(
    url: string,
    label: string,
    zone: number | string
  ) {
    return (
      this.http.get(url, {
        params: {
          "_columns[]": ["id"],
          page: 1,
          per_page: 1,
          zone_id: zone,
        },
      }) as Observable<PaginateResult<unknown>>
    ).pipe(map((state) => ({ total: state.total, label })));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
