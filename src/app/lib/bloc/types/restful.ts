import { Observable } from "rxjs";

export interface RestfulServiceInterface<T> {
  /**
   * Call the REST service /GET <resource>/:id command interface
   *
   * @param query
   */
  get<TQuery extends Record<string, unknown> | number | string>(
    query?: TQuery
  ): Observable<T>;

  /**
   * Call the REST service /GET command interface
   *
   * @param query
   */
  all<TQuery extends Record<string, unknown>>(query?: TQuery): Observable<T[]>;

  /**
   * Call the REST service /POST command interface
   *
   * @param body
   */
  create<TBody = unknown>(body: TBody): Observable<T>;

  /**
   * Call the REST service /PUT <resource>/:id command interface
   *
   * @param query
   * @param body
   */
  update<TQuery = Record<string, unknown> | number | string, TBody = unknown>(
    query: TQuery,
    body: TBody
  ): Observable<T> | Observable<boolean>;

  /**
   * Call the REST service /DELETE <resource>/:id command interface
   *
   * @param query
   */
  delete<TQuery = Record<string, unknown> | number | string>(
    query: TQuery
  ): Observable<boolean>;
}
