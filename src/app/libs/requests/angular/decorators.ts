import { CacheQueryConfig, useDefaultCacheConfig } from "../caching";
import { QueryProviderType } from "../types";
import { QueryStateLeastParameters, useQuery } from "./helpers";
import { ObserveKeyType } from "./types";

/**
 * Class property decorator sending query using HTTP Query client.
 * It automatically invokes client provided query at initialization
 *
 * It caches the the result of the query and refetch it in the background
 * if client requested it to do so.
 *
 * @param params
 */
export const QueryState = <T>(
  params: T,
  ...args: [...QueryStateLeastParameters<T>]
) => {
  return <TargetType>(target: TargetType, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      value: useQuery(params, ...args),
    });
  };
};

/**
 * Decorates a class property use to send query to backend server using the HTTP
 * Query client insterface
 *
 * @returns
 */
export const QueryDispatch = <T>() => {
  return <TargetType>(target: TargetType, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      value: useQuery.bind(target),
    });
  };
};

/**
 * Decorates Query provider classes to add cache configuration values
 *
 * @param cacheConfig
 */
export function ProvidesQuery(
  cacheConfig?: (CacheQueryConfig & { observe?: ObserveKeyType }) | boolean
) {
  return <T extends new (...args: any[]) => QueryProviderType>(
    constructor: T
  ) => {
    const { name } = constructor;
    return class extends constructor {
      public readonly cacheConfig: CacheQueryConfig & {
        name: string;
        observe?: ObserveKeyType;
      } = {
        ...(typeof cacheConfig === "boolean" && cacheConfig === true
          ? useDefaultCacheConfig()
          : cacheConfig),
        name: `query::bindTo[${name}]`,
      };
    };
  };
}
