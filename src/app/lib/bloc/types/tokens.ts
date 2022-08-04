import { InjectionToken } from "@angular/core";
import { RequestClient } from "./http";

export const REQUEST_CLIENT = new InjectionToken<RequestClient>(
  'Createst an instance of http request client'
);
