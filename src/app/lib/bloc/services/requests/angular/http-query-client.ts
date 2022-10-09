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
    const { path, method, params, body, observe } =
      typeof query !== "function"
        ? query
        : ({} as QueryType<HTTPRequestMethods>);
    // For /GET and /DELETE requests, we treat query.body as a query parameter
    const cacheId = this.requests.dispatch(
      typeof query !== "function"
        ? ({
            name: method ? `${method}_${path}` : `${path}`,
            payload: {
              params,
              body,
              observe,
              options: {
                params:
                  method?.toUpperCase() === "GET" &&
                  typeof body === "object" &&
                  body !== null
                    ? { ...(query.params ?? {}), ...body }
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
