import { InjectorServiceLocator } from "../service-locator";
import { HTTP_QUERY_CLIENT } from "../token";
import { HTTPRequestMethods } from "../../http";
import {
  ObserveKeyType,
  QueryClientType,
  QueryParameter,
  QueryType,
} from "../../types";
import { CacheQueryProviderType, QueryStateLeastParameters } from "./types";

/**
 * @internal
 *
 * @param provider
 */
export const createQueryCreator = <TMethod extends string>(
  provider?: QueryClientType<TMethod>
) => {
  if (provider) {
    return provider.invoke.bind(provider);
  }
  const service = InjectorServiceLocator.getInstance().get(HTTP_QUERY_CLIENT);
  // We Bind the invoke query to the resolved service for references to this to point to the service itself
  return service.invoke.bind(service);
};

/**
 * @internal
 *
 * @param params
 * @param _args
 */
export function parseQueryArguments<T, TMethod extends string>(
  params: T,
  _args: [...QueryStateLeastParameters<T>]
) {
  const _params = params as unknown;
  let _arguments!: [...QueryStateLeastParameters<T>];
  let _query!: QueryType<HTTPRequestMethods> | T;
  let _provider!: QueryClientType<TMethod> | undefined;
  let observe!: ObserveKeyType;
  if (
    (_params as QueryParameter<T, HTTPRequestMethods>).query &&
    (_params as QueryParameter<T, HTTPRequestMethods>).arguments
  ) {
    const {
      query,
      arguments: args,
      provider,
    } = _params as QueryParameter<T, HTTPRequestMethods>;
    _query = query;
    _arguments = (args ?? []) as [...QueryStateLeastParameters<T>];
    _provider = provider;
    observe =
      typeof query === "object" &&
      query !== null &&
      (query as QueryType).observe
        ? (query as QueryType).observe
        : "request";
  } else if (
    (_params as CacheQueryProviderType).provides &&
    typeof (_params as CacheQueryProviderType).provides === "function"
  ) {
    _query = ((...args: unknown[]) => {
      return (_params as CacheQueryProviderType).provides(...args);
    }).bind(_params) as unknown as T;
    const cacheConfig = (_params as CacheQueryProviderType).cacheConfig;
    _arguments = (
      typeof cacheConfig !== "undefined" && cacheConfig !== null
        ? [...(_args ?? []), cacheConfig]
        : _args ?? []
    ) as [...QueryStateLeastParameters<T>];
  } else if ((_params as QueryType<HTTPRequestMethods>).path) {
    _query = _params as QueryType<HTTPRequestMethods>;
    _provider = (_params as QueryType).provider;
    _arguments = _args;
    observe =
      typeof _query === "object" &&
      _query !== null &&
      (_query as QueryType).observe
        ? (_query as QueryType).observe
        : "request";
  } else if (typeof params === "function") {
    _query = _params as any as T;
    _arguments = _args;
  }
  return [_provider, _query, _arguments, observe] as [
    QueryClientType<TMethod> | undefined,
    QueryType<HTTPRequestMethods> | T,
    [...QueryStateLeastParameters<T>],
    ObserveKeyType
  ];
}
