import { InjectionToken } from '@angular/core';
import { RequestHandler } from './types';

export const REQUEST_BACKEND_HANDLER = new InjectionToken<RequestHandler>(
  'Createst an instance of request client'
);
