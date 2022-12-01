import { Provider } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import { CacheQueryConfig } from "../caching";
import { RequestInterface } from "../http";
import {
  CommandInterface,
  Disposable,
  FnActionArgumentLeastType,
  QueryManager,
  QueryState
} from "../types";

/**
 * @internal
 */
export type ObserveKeyType = "request" | "response" | "body" | undefined;

/**
 * @internal
 */
export type QueryArguments<F> = F extends (
  ...args: infer A
) => ObservableInput<unknown>
  ? [...A, FnActionArgumentLeastType] | [...A]
  : F extends RequestInterface
  ? [CacheQueryConfig | boolean] | []
  : never;

/**
 * @internal
 */
export type HostStringParamType = {
  host?: string;
};

/**
 * @internal
 */
export type HostProviderParamType = {
  hostProvider?: Provider;
};

/**
 * @internal
 */
export type ModuleParamType = HostStringParamType | HostProviderParamType;

/**
 * Composed query manager type definition
 *
 * @internal
 */
export type QueryManagerType = CommandInterface<unknown> &
  QueryManager<Observable<QueryState>> &
  Disposable;
