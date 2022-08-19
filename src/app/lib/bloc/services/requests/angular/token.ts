import { InjectionToken } from "@angular/core";
import { HTTPRequestMethods } from '../http';
import { QueryClientType, RequestsConfig } from "../types";

export const HTTP_HOST = new InjectionToken<string>(
  "URI to the backend http host"
);

export const REQUEST_ACTIONS = new InjectionToken<RequestsConfig>(
  "Request actions map definitions"
);

export const HTTP_QUERY_CLIENT = new InjectionToken<QueryClientType<HTTPRequestMethods>>(
  "HTTP Query client injected type"
);
