import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { QueryProviderType } from "./lib/bloc/services/requests";
import { ProvidesQuery } from "./lib/bloc/services/requests/angular";
import { getHttpHost, isValidHttpUrl } from "./lib/bloc/services/requests/http";

@Injectable()
@ProvidesQuery({
  observe: 'body'
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
    const host = this.config.get<string>("api.host", environment.api.host);
    return this.httpClient.get(
      isValidHttpUrl(path)
        ? path
        : `${host ? getHttpHost(host) : host}/${path ?? ""}`,
      { params }
    ) as Observable<Object>;
  }
}
