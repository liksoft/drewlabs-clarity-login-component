import { ObservableInput } from "@azlabsjs/smart-form-core";
import { first, isObservable, Observable } from "rxjs";
import { HTTPRequestMethods } from "../http";
import { apiResponse } from "../rx";
import {
  CacheQueryConfig,
  FnActionArgumentLeastType,
  DispatchLeastArgumentTypes,
  ObservableInputFunction,
  QueryParameter,
  QueryType,
  RequestArguments,
  RequestState,
} from "../types";
import { InjectorServiceLocator } from "./service-locator";
import { HTTP_QUERY_CLIENT } from "./token";

type QueryArguments<TFunc extends ObservableInputFunction> =
  | [...QueryTypeLeastArgumentType<QueryType<HTTPRequestMethods>>]
  | [...DispatchLeastArgumentTypes<TFunc>]
  | [...DispatchLeastArgumentTypes<TFunc>, FnActionArgumentLeastType];

export type QueryDispatchType<TFunc extends ObservableInputFunction> = (
  query: QueryType<HTTPRequestMethods> | TFunc,
  ...values: QueryArguments<TFunc>
) => ObservableInput<unknown>;

// type KeyType<TargetType> = keyof TargetType extends HTTPQueryClientType ? keyof TargetType : TypeError;

export type QueryTypeLeastArgumentType<F> = F extends QueryType
  ? [CacheQueryConfig | boolean] | []
  : never;

export type QueryStateLeastParameters<F> = F extends (
  ...args: infer A
) => ObservableInput<unknown>
  ? [...A, FnActionArgumentLeastType] | [...A]
  : F extends Partial<QueryType>
  ? [CacheQueryConfig | boolean] | []
  : F extends Partial<
      QueryParameter<ObservableInputFunction, HTTPRequestMethods>
    >
  ? []
  : never;

const createQueryFn = <TargetType, TFunc extends ObservableInputFunction>(
  target: TargetType,
  provider?: keyof TargetType
) => {
  let queryFn!: QueryDispatchType<TFunc>;
  if (provider) {
    if (
      typeof target[provider] === "undefined" ||
      target[provider] === null ||
      typeof (target[provider] as any)?.invoke !== "function"
    ) {
      throw new Error(`${typeof target} must define a query property`);
    }
    queryFn = (
      (target[provider] as any).invoke as QueryDispatchType<TFunc>
    ).bind(target[provider]);
  }
  if (typeof queryFn === "undefined" || queryFn === null) {
    const service = InjectorServiceLocator.getInstance().get(HTTP_QUERY_CLIENT);
    // We Bind the invoke query to the resolved service for references to this to point to the service itself
    queryFn = service.invoke.bind(service) as QueryDispatchType<TFunc>;
  }
  return queryFn;
};

function parseArguments<
  TFunction extends ObservableInputFunction,
  TProviderKey
>(params: unknown, _args: QueryArguments<TFunction>) {
  let _arguments!: QueryArguments<TFunction>;
  let _query!: QueryType<HTTPRequestMethods> | TFunction;
  let _provider!: TProviderKey | unknown | undefined;
  // const { query, arguments: args } = params;
  if (
    (params as QueryParameter<TFunction, HTTPRequestMethods>).query &&
    (params as QueryParameter<TFunction, HTTPRequestMethods>).arguments
  ) {
    const {
      query,
      arguments: args,
      provider,
    } = params as QueryParameter<TFunction, HTTPRequestMethods>;
    _query = query;
    _arguments = args ?? ([] as QueryArguments<TFunction>);
    _provider = provider;
  } else if ((params as QueryType<HTTPRequestMethods>).path) {
    _query = params as QueryType<HTTPRequestMethods>;
    _provider = (params as QueryType<HTTPRequestMethods>).provider;
    _arguments = _args;
  } else if (typeof params === "function") {
    _query = params as TFunction;
    _arguments = _args;
  }

  return [_provider, _query, _arguments] as [
    TProviderKey | undefined,
    QueryType<HTTPRequestMethods> | TFunction,
    QueryArguments<TFunction>
  ];
}

// type ProviderKeyType<>
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
  return <
    TFunc extends ObservableInputFunction,
    TargetType,
    TProviderKey extends keyof TargetType
  >(
    target: TargetType,
    propertyKey: string
  ) => {
    Object.defineProperty(target, propertyKey, {
      get: () => {
        const [_provider, _query, _arguments] = parseArguments<
          TFunc,
          TProviderKey
        >(params, args as any);
        return createQueryFn(target, _provider)(
          _query as any,
          ...(_arguments ? (_arguments as any) : [])
        );
      },
    });
  };
};

/**
 * Decorates a class property use to send query to backend server using the HTTP
 * Query client insterface
 *
 * @returns
 */
export const DispatchQuery = <
  TargetType,
  TFunc extends ObservableInputFunction
>() => {
  return (target: TargetType, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get:
        () =>
        <TResponse, TProviderKey extends keyof TargetType>(
          params:
            | TFunc
            | QueryParameter<TFunc, HTTPRequestMethods>
            | QueryType<HTTPRequestMethods>,
          ..._args: [...QueryArguments<TFunc>]
        ) => {
          const [_provider, _query, _arguments] = parseArguments<
            TFunc,
            TProviderKey
          >(params, _args);
          const result = createQueryFn(target, _provider)(
            _query as any,
            ...(_arguments ? (_arguments as any) : [])
          );
          return isObservable(result)
            ? (result as Observable<RequestState<RequestArguments>>).pipe(
                apiResponse<TResponse>(),
                first()
              )
            : result;
        },
    });
  };
};
