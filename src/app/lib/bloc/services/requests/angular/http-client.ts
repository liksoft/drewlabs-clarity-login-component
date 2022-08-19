import { Injectable } from "@angular/core";
import { useRequestSelector } from "../helpers";
import { HTTPRequestMethods } from "../http/types";
import {
  Action,
  DispatchLeastArgumentTypes,
  QueryClientType,
  QueryType,
  RequestInterface,
} from "../types";
import { QueryRequestsProvider } from "./query-requests";

@Injectable()
export class RESTHTTPQueryClient
  implements QueryClientType<HTTPRequestMethods>
{
  // Creates an instance of { @see NgHTTPClientClient }
  constructor(private requests: QueryRequestsProvider) {}

  // Handles HTTP requests
  invoke<TFunc extends Function>(
    query: QueryType<HTTPRequestMethods> | TFunc,
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
