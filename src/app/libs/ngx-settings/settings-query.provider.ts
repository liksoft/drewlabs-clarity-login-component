import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProvidesQuery } from "@azlabsjs/ngx-query";
import { QueryProviderType } from "@azlabsjs/rx-query";
import { map } from "rxjs";
import { ResponseInterceptorType } from "./types";

@Injectable()
@ProvidesQuery({
  observe: "body",
  refetchInterval: 300000, // Set the refetch interval to 5min
})
export class RESTQueryProvider
  implements
    QueryProviderType<
      [string, string, Record<string, string>, ResponseInterceptorType]
    >
{
  constructor(private http: HttpClient) {}

  //
  query(
    method: string,
    endpoint: string,
    params?: Record<string, string>,
    responseInterceptor?: ResponseInterceptorType
  ) {
    // TODO Provides implementation for a pagigation implmentation
    return this.http
      .request(method, endpoint, {
        params: new HttpParams({ fromObject: params }),
        responseType: "json",
      })
      .pipe(
        map(
          responseInterceptor ??
            ((response) => response as Record<string, unknown>)
        )
      );
  }
}
