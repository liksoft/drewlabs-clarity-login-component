import { Observable } from "rxjs";
import { CacheQueryConfig, QueryClientType } from "../types";

export type HTTPRequestMethods =
  | "GET"
  | "DELETE"
  | "OPTION"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "get"
  | "delete"
  | "option"
  | "head"
  | "post"
  | "put"
  | "patch";

export type RestHTTPClient = QueryClientType<HTTPRequestMethods> & {
  /**
   * Sends an HTTP request to the backend server using the /GET HTTP verb
   *
   * @param path
   * @param options
   */
  get<T = unknown>(
    path: string,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
      cache?: boolean | CacheQueryConfig;
    }
  ): Observable<T>;

  /**
   * Sends an HTTP request to the backend server using the /POST HTTP verb
   *
   * @param path
   * @param body
   * @param options
   */
  post<T = unknown>(
    path: string,
    body: unknown,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
      cache?: boolean | CacheQueryConfig;
    }
  ): Observable<T>;

  /**
   * Sends an HTTP request to the backend server using the /PUT HTTP verb
   *
   * @param path
   * @param body
   * @param options
   */
  put<T = unknown>(
    path: string,
    body: unknown,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
      cache?: boolean | CacheQueryConfig;
    }
  ): Observable<T>;

  /**
   * Sends an HTTP request to the backend server using the /PATCH HTTP verb
   *
   * @param path
   * @param body
   * @param options
   */
  patch<T = unknown>(
    path: string,
    body: unknown,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
      cache?: boolean | CacheQueryConfig;
    }
  ): Observable<T>;

  /**
   * Sends an HTTP request to the backend server using the /DELETE HTTP verb
   *
   * @param path
   * @param options
   */
  delete<T = unknown>(
    path: string,
    options?: {
      headers?: [string, string][] | Record<string, string>;
      responseType?: ResponseType;
      params?: Record<string, any> | { [header: string]: string | string[] };
      withCredentials?: boolean;
      cache?: boolean | CacheQueryConfig;
    }
  ): Observable<T>;
};
