import {
  FnActionArgumentLeastType, QueryArguments, RequestsConfig
} from "./types";

// @internal
export const defaultCacheConfig = {
  retries: 3, // By default each query is executed 3 times
  retryDelay: 1000,
  refetchInterval: 300000, // Refetch the query each 5 min interval
  refetchOnReconnect: true,
  staleTime: 0, // By default query is mark stale automatically when it's fetch/refetch
  cacheTime: 300000, // After 5 minutes, if no subscriber listens to the query object, the query is invalidate
};

/**
 * Generates a v4 like universal unique identifier
 *
 * @internal
 */
export function guid() {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    v4() +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    "-" +
    v4() +
    v4() +
    v4()
  );
}

/**
 * @inteernal
 */
export function buildCacheQuery<T extends (...args: any) => any>(
  argument: [string, T, ...QueryArguments<T>],
  cacheConfig?: FnActionArgumentLeastType
) {
  const _arguments = argument as [string, T, ...QueryArguments<T>];
  let name!: string;
  if (
    cacheConfig &&
    typeof cacheConfig.name !== "undefined" &&
    cacheConfig.name !== null
  ) {
    name = cacheConfig.name;
  } else {
    const fn = _arguments[1];
    const funcName = fn.name === "" ? undefined : fn.name;
    const parameters = fn.toString().match(/\( *([^)]+?) *\)/gi);
    name =
      fn.prototype ??
      `${funcName ?? `native anonymous`}${
        parameters ? parameters[0] : "()"
      } { ... }`;
  }
  return [_arguments[0], name, ...argument.slice(2)];
}

/**
 * @internal
 */
export function buildQueryPath(
  name: string,
  method: string,
  path?: string,
  params?: Record<string, any>,
  config?: RequestsConfig
) {
  if (path === null || typeof path === "undefined") {
    path = name.replace(new RegExp(`^${method}_`), "");
  }

  // When requests in the application must be global prefixed
  // We add the prefix to the path variable for each request being performed
  if (config?.prefix) {
    path = `${
      config.prefix.endsWith("/")
        ? config.prefix.substring(0, config.prefix.length - 1)
        : config.prefix
    }/${path}`;
  }

  // // Replace request parameters with their values
  // params = params ?? options?.params ?? undefined;
  if (params) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        path = path.replace(new RegExp(`:${key}`, "g"), `/${params[key]}`);
      }
    }
  }
  // API endpoint must be separeted with _ symbol when constructed with with action name
  // therefore, we replace any _ with / to match the endpoint path
  return path.replace(/[_]{2}/g, "/");
}
