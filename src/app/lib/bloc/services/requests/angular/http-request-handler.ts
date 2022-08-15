import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable, ObservableInput, tap } from "rxjs";
import { getHttpHost, HTTP_HOST, isValidHttpUrl } from "../http";
import { RequestHandler, ResponseType } from "../types";


/**
 * Provides a request handler that uses angular HTTP client for sending
 * request to the backend server
 */
@Injectable()
export class HTTPRequestHandler implements RequestHandler {
  // Creates a new instance of { @see NgHttpRequestHandler }
  constructor(
    private httpClient: HttpClient,
    @Inject(HTTP_HOST) @Optional() private host?: string
  ) {}

  /**
   * @implements
   */
  execute<T = unknown>(
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
  ): ObservableInput<T> {
    //#region Prepare request URL
    const url = isValidHttpUrl(path)
      ? path
      : `${this.host ? getHttpHost(this.host) : this.host}/${path ?? ""}`;
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
    return this.httpClient
      .request(method, url, {
        body,
        responseType: responseType,
        headers: _headers as { [header: string]: string | string[] },
        params: params,
        withCredentials,
        observe: 'response'
      })
      .pipe(tap(console.log)) as Observable<T>;
  }
}
