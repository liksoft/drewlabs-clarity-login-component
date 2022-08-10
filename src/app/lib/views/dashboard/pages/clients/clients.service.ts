import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { tap } from "rxjs";
import {
  RestfulServiceInterface,
  Requests,
  createQueryParams,
  apiResponse,
} from "src/app/lib/bloc";

//#region individual members service
@Injectable()
export class MembersService implements RestfulServiceInterface<unknown> {
  //
  constructor(
    private requests: Requests,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  private endpoint = () =>
    this.config.get("api.endpoints.members", "api/v1/members") as string;

  //
  get<TQuery extends string | number | Record<string, unknown>>(
    query?: TQuery | undefined
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  all<TQuery extends Record<string, unknown>>(query?: TQuery | undefined) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `get_${this.endpoint()}${createQueryParams(query)}`,
          payload: { params: query },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  create<TBody = unknown>(body: TBody) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}`,
          payload: {
            body,
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  update<TQuery = string | number | Record<string, unknown>, TBody = unknown>(
    query: TQuery,
    body: TBody
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `put_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            body,
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  delete<TQuery = string | number | Record<string, unknown>>(query: TQuery) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `delete_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }
}
//#endregion individual members service

//#region individual members service
@Injectable()
export class IndividualMembersService
  implements RestfulServiceInterface<unknown>
{
  //
  constructor(
    private requests: Requests,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  private endpoint = () =>
    this.config.get(
      "api.endpoints.individuals",
      "api/v1/individuals"
    ) as string;

  //
  get<TQuery extends string | number | Record<string, unknown>>(
    query?: TQuery | undefined
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  all<TQuery extends Record<string, unknown>>(query?: TQuery | undefined) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `get_${this.endpoint()}${createQueryParams(query)}`,
          payload: { params: query },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  create<TBody = unknown>(body: TBody) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}`, // "post_api__v1__members",
          payload: {
            body,
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  update<TQuery = string | number | Record<string, unknown>, TBody = unknown>(
    query: TQuery,
    body: TBody
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `put_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            body,
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  delete<TQuery = string | number | Record<string, unknown>>(query: TQuery) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `delete_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }
}
//#endregion individual members service

//#region Moral members service
@Injectable()
export class MoralMembersService implements RestfulServiceInterface<unknown> {
  //
  constructor(
    private requests: Requests,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  private endpoint = () =>
    this.config.get("api.endpoints.morals", "api/v1/morals") as string;

  //
  get<TQuery extends string | number | Record<string, unknown>>(
    query?: TQuery | undefined
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  all<TQuery extends Record<string, unknown>>(query?: TQuery | undefined) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `get_${this.endpoint()}${createQueryParams(query)}`,
          payload: { params: query },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  create<TBody = unknown>(body: TBody) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}`,
          payload: {
            body,
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  update<TQuery = string | number | Record<string, unknown>, TBody = unknown>(
    query: TQuery,
    body: TBody
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `put_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            body,
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  delete<TQuery = string | number | Record<string, unknown>>(query: TQuery) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `delete_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }
}
//#endregion Moral members service

//#region Customers service
@Injectable()
export class CustomersService implements RestfulServiceInterface<unknown> {
  //
  constructor(
    private requests: Requests,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  private endpoint = () =>
    this.config.get("api.endpoints.customers", "api/v1/customers") as string;

  //
  get<TQuery extends string | number | Record<string, unknown>>(
    query?: TQuery | undefined
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  all<TQuery extends Record<string, unknown>>(query?: TQuery | undefined) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `get_${this.endpoint()}${createQueryParams(query)}`,
          payload: { params: query },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  create<TBody = unknown>(body: TBody) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}`,
          payload: {
            body,
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  update<TQuery = string | number | Record<string, unknown>, TBody = unknown>(
    query: TQuery,
    body: TBody
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `put_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            body,
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  delete<TQuery = string | number | Record<string, unknown>>(query: TQuery) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `delete_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }
}
//#endregion Customers service

//#region Stake holders service
@Injectable()
export class StakeHoldersService implements RestfulServiceInterface<unknown> {
  //
  constructor(
    private requests: Requests,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}

  private endpoint = () =>
    this.config.get(
      "api.endpoints.stakeHolders",
      "api/v1/stake-holders"
    ) as string;

  //
  get<TQuery extends string | number | Record<string, unknown>>(
    query?: TQuery | undefined
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  all<TQuery extends Record<string, unknown>>(query?: TQuery | undefined) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `get_${this.endpoint()}${createQueryParams(query)}`,
          payload: { params: query },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  create<TBody = unknown>(body: TBody) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `post_${this.endpoint()}`,
          payload: {
            body,
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  update<TQuery = string | number | Record<string, unknown>, TBody = unknown>(
    query: TQuery,
    body: TBody
  ) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `put_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            body,
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }

  delete<TQuery = string | number | Record<string, unknown>>(query: TQuery) {
    return this.requests
      .select(
        this.requests.dispatch({
          name: `delete_${this.endpoint()}${createQueryParams(query)}`,
          payload: {
            params:
              typeof query === "object" && query !== null
                ? query
                : { id: query },
          },
        })
      )
      .pipe(apiResponse(), tap(console.log));
  }
}
//#endregion Stake holders
