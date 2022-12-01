import { Provider } from "@angular/core";
import { ObservableInput } from "rxjs";
import { CacheQueryConfig } from "../caching";
import { RequestInterface } from "../http";
import { FnActionArgumentLeastType } from "../types";

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
