import { InjectionToken } from "@angular/core";
import { RequestClient } from "./http";

export const HTTP_CLIENT = new InjectionToken<RequestClient>(
  'Createst an instance of http request client'
);
