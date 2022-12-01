import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { first, interval, mergeMap } from "rxjs";
import { environment } from "src/environments/environment";
import { QueryProviderType } from "./libs/requests";
import { ProvidesQuery } from "./libs/requests/angular";
import { getHttpHost, isValidHttpUrl } from "./libs/requests/http";

@Injectable()
@ProvidesQuery({
  observe: "body",
  staleTime: 0,
  cacheTime: 5000,
})
export class TestQueryStateProvider
  implements
    QueryProviderType<[string, Record<string, any> | [string, string]]>
{
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  query(path: string, params?: Record<string, any>) {
    console.log("TestQueryStateProvider: ", path, params);
    const host = this.config.get<string>("api.host", environment.api.host);
    return interval(path === "posts" ? 1500 : 500).pipe(
      first(),
      mergeMap(() =>
        this.httpClient.get(
          isValidHttpUrl(path)
            ? path
            : `${host ? getHttpHost(host) : host}/${path ?? ""}`,
          { params }
        )
      )
    );
  }
}
