import { Injectable } from "@angular/core";
import { useRequestSelector } from "../helpers";
import { HTTPQueryClientType, HTTPRequestMethods } from "../http/types";
import {
  Action,
  DispatchLeastArgumentTypes,
  QueryType,
  RequestInterface,
} from "../types";
import { QueryRequestsProvider } from "./query-requests";

@Injectable()
export class RESTHTTPQueryClient implements HTTPQueryClientType {
  // Creates an instance of { @see NgHTTPClientClient }
  constructor(private requests: QueryRequestsProvider) {}

  // Handles HTTP requests
  invoke<
    TFunc extends Function,
    TMethod extends HTTPRequestMethods = HTTPRequestMethods
  >(
    query: QueryType<TMethod> | TFunc,
    ...args: [...DispatchLeastArgumentTypes<TFunc>]
  ) {
    // For /GET and /DELETE requests, we treat query.body as a query parameter
    const cacheId = this.requests.dispatch(
      typeof query !== "function"
        ? ({
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
          } as Action<RequestInterface>)
        : (query as TFunc),
      ...args
    );
    return useRequestSelector([this.requests.state$, this.requests.cache])(
      cacheId
    );
  }
}
