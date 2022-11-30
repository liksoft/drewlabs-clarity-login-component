import { Inject, Injectable, Optional } from "@angular/core";
import { useHTTPActionQuery, useRequestSelector } from "../helpers";
import { HTTPRequestMethods } from "../http/types";
import {
  Action, QueryArguments, QueryClientType, QueryType,
  RequestInterface
} from "../types";
import { HTTPRequestHandler } from "./http-request-handler";
import { QueryRequestsProvider } from "./query-requests";
import { WINDOW } from "./token";

@Injectable()
export class RESTHTTPQueryClient
  implements QueryClientType<HTTPRequestMethods>
{
  // Creates an instance of { @see NgHTTPClientClient }
  constructor(
    private requests: QueryRequestsProvider,
    private backend: HTTPRequestHandler,
    @Inject(WINDOW) @Optional() private defaultView?: Window
  ) {}

  // Handles HTTP requests
  invoke<TFunc extends (...args: any) => any>(
    query: QueryType<HTTPRequestMethods> | TFunc,
    ...args: [...QueryArguments<TFunc>]
  ) {
    const query$ =
      typeof query !== "function"
        ? (useHTTPActionQuery(this.backend, {
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
          } as Action<RequestInterface>) as (...args: any) => any)
        : query;
    // For /GET and /DELETE requests, we treat query.body as a query parameter
    const cacheId = this.requests.dispatch(query$, ...args);
    return useRequestSelector([this.requests.state$, this.requests.cache])(
      cacheId
    );
  }
}
