import { InjectionToken } from "@angular/core";
import { HTTPQueryClientType } from "../http";
import { RequestsConfig } from "../types";

export const HTTP_HOST = new InjectionToken<string>(
  "URI to the backend http host"
);

export const REQUEST_ACTIONS = new InjectionToken<RequestsConfig>(
  "Request actions map definitions"
);

export const HTTP_QUERY_CLIENT = new InjectionToken<HTTPQueryClientType>(
  "HTTP Query client injected type"
);
