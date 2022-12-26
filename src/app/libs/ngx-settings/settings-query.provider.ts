import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { ProvidesQuery } from "@azlabsjs/ngx-query";
import { map, mergeMap, of, tap } from "rxjs";
import { defaultSettingConfigs } from "./defaults";
import {
  createPaginationChunk,
  queryPaginationate,
} from "./settings-query.helpers";
import {
  ResponseInterceptorType,
  SETTING_PROVIDER_CONFIG,
  SettingProviderConfigType,
  SettingsQueryProviderType,
} from "./types";

@Injectable()
@ProvidesQuery({
  observe: "body",
  refetchInterval: 300000, // Set the refetch interval to 5min
})
export class RESTQueryProvider implements SettingsQueryProviderType {
  // #region class properties
  // #region class properties

  constructor(
    private http: HttpClient,
    @Inject(SETTING_PROVIDER_CONFIG)
    @Optional()
    private config: SettingProviderConfigType = defaultSettingConfigs
  ) {}

  /**
   * {@inheritdoc}
   *
   * Instead of returning an observable of item we make use of a callback function
   * that can be invoked at any stage of the query implementation.
   *
   * We aim for such implementation in order to load the first page of the paginated
   * data and display it to the user whenever requested, and load the remaining pages
   * in background and notify the settings provider when the data is fully loaded
   */
  query(
    method: string,
    endpoint: string,
    callback: (items: Record<string, unknown>[], partial: boolean) => void,
    params?: Record<string, string>,
    responseInterceptor?: ResponseInterceptorType
  ) {
    // First thing first, we query for the first page of the collection
    // The result of the first page query is expected to return a pgaination instance
    // and we use the pagination result meta data to query for the remaining pages
    return this.sendRequest(
      method,
      this.prepareForPagination(endpoint, 1),
      params
    ).pipe(
      mergeMap((response: { [k: string]: any }) => {
        // First pagination chunk
        const items = (
          responseInterceptor ??
          ((response) => response as Record<string, unknown>[])
        )(response);
        // When the first page of data is loaded, we call the callback function
        // with the loaded data with the partial flag turns on
        callback(items, true);
        if (
          response["total"] &&
          response["total"] !== null &&
          typeof response["total"] !== "undefined" &&
          // Add a condition that checks if the total items
          // is not greater than the length of the list of query result items
          Number(response["total"]) > items.length
        ) {
          return queryPaginationate(
            (page) =>
              this.sendRequest(
                method,
                this.prepareForPagination(endpoint, page),
                params
              ).pipe(
                map(
                  responseInterceptor ??
                    ((response) => response as Record<string, unknown>[])
                )
              ),
            response["total"],
            this.config.pagination?.perPage ??
              defaultSettingConfigs.pagination.perPage,
            this.config.chunkSize ?? defaultSettingConfigs.chunkSize,
            this.config.queryInterval ?? defaultSettingConfigs.queryInterval
          )(createPaginationChunk).pipe(
            // When the pagination data is completed loading, we fetch call the callback
            // with result items, and the partial flag turned off
            tap((state) => callback([...items, ...state.flat()], false)),
            map((_) => true)
          );
        }
        return of(true);
      })
    );
  }

  /**
   * Prepare query endpoint for pagination
   */
  private prepareForPagination(endpoint: string, page: number) {
    endpoint = endpoint ?? "";
    if (endpoint.indexOf("?") === -1) {
      endpoint += "?";
    }
    if (endpoint.indexOf("per_page") === -1) {
      const paginationQuery = `page=${page}&per_page=${
        this.config.pagination?.perPage ?? 100
      }`;
      endpoint += endpoint.endsWith("?")
        ? paginationQuery
        : `&${paginationQuery}`;
    }
    return endpoint;
  }

  /**
   * Actually send HTTP request to the backend server
   */
  private sendRequest(
    method: string,
    endpoint: string,
    params?: Record<string, string>
  ) {
    return this.http.request(method, endpoint, {
      params: new HttpParams({ fromObject: params }),
      responseType: "json",
    });
  }
}
