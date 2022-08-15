import { Provider } from "@angular/core";

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
