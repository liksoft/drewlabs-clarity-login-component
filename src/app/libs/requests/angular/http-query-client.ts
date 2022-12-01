import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import { useRequestSelector } from "../helpers";
import {
  getHttpHost,
  HTTPRequestMethods,
  HTTP_HOST,
  isValidHttpUrl,
  RequestInterface,
  RequestsConfig,
  ResponseType,
  RESTQueryFunc,
  useHTTPActionQuery
} from "../http";
import { Requests } from "../requests";
import { Action, QueryClientType, QueryType } from "../types";
import { REQUEST_ACTIONS, WINDOW } from "./token";
import { ObserveKeyType, QueryArguments } from "./types";

function useHTTPRequestHandler<T = unknown>(client: HttpClient, host?: string) {
  return (
    path: string,
    method: string,
    body: unknown,
    options?:
      | {
          headers?: [string, string][] | Record<string, string> | undefined;
          responseType?: Exclude<ResponseType, "document"> | undefined;
          params?:
            | Record<string, any>
            | { [header: string]: string | string[] };
          withCredentials?: boolean;
        }
      | undefined
  ): ObservableInput<T> => {
    //#region Prepare request URL
    const url = isValidHttpUrl(path)
      ? path
      : `${host ? getHttpHost(host) : host}/${path ?? ""}`;
    //#endregion Prepare request URL

    const { headers, responseType, params, withCredentials } = options || {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    };
    //#region Prepare request headers
    const _headers = Array.isArray(headers)
      ? headers.reduce((carry, current) => {
          const [key, value] = current;
          carry[key] = value;
          return carry;
        }, {} as Record<string, unknown | string>)
      : headers;
    //#endregion Prepare request headers
    return client.request(method, url, {
      body,
      responseType: responseType,
      headers: _headers as { [header: string]: string | string[] },
      params: params,
      withCredentials,
      observe: "response",
    }) as Observable<T>;
  };
}

@Injectable({
  providedIn: "root",
})
export class RESTHTTPQueryClient
  implements QueryClientType<HTTPRequestMethods>
{
  //#region Service properties
  private readonly query = new Requests();
  //#endregion Service properties
  // Creates an instance of { @see NgHTTPClientClient }
  constructor(
    private client: HttpClient,
    @Inject(PLATFORM_ID) @Optional() private platformId: Object,
    @Inject(REQUEST_ACTIONS) @Optional() private config?: RequestsConfig,
    @Inject(HTTP_HOST) @Optional() private host?: string,
    @Inject(WINDOW) @Optional() private defaultView?: Window
  ) {}

  // Handles HTTP requests
  invoke<TFunc extends (...args: any) => any>(
    query: QueryType<HTTPRequestMethods, ObserveKeyType> | TFunc,
    ...args: [...QueryArguments<TFunc>]
  ) {
    const query$ =
      typeof query !== "function"
        ? (useHTTPActionQuery(
            useHTTPRequestHandler(
              this.client,
              this.host
            ) as RESTQueryFunc<unknown>,
            {
              name: `${query.method ?? ""}_${query.path ?? ""}`,
              payload: {
                ...query,
                options: {
                  params:
                    query.method?.toUpperCase() === "GET" &&
                    typeof query.body === "object" &&
                    query.body !== null
                      ? { ...(query.params ?? {}), ...query.body }
                      : query.params,
                },
              },
            } as Action<RequestInterface>
          ) as (...args: any) => any)
        : query;
    const cacheId = this.query.dispatch(query$, ...args);
    return useRequestSelector([this.query.state$, this.query.cache])(cacheId);
  }
}
