import { ObservableInput } from "rxjs";
import { HTTPRequestMethods } from "../../http";
import {
  CacheQueryConfig,
  FnActionArgumentLeastType,
  ObservableInputFunction,
  ObserveKeyType,
  QueryParameter,
  QueryProviderType,
  QueryType,
} from "../../types";

type QueryProviderProvidesParamType<
  TParam extends [...unknown[]],
  T extends QueryProviderType<TParam>
> = Parameters<T["query"]>;

export type QueryTypeLeastArgumentType<F> = F extends QueryType
  ? [CacheQueryConfig | boolean] | []
  : never;

export type QueryStateLeastParameters<F> = F extends (
  ...args: infer A
) => ObservableInput<unknown>
  ? [...A, FnActionArgumentLeastType] | [...A]
  : F extends QueryProviderType
  ? [...QueryProviderProvidesParamType<Parameters<F["query"]>, F>]
  : F extends Partial<QueryType>
  ? [CacheQueryConfig | boolean] | []
  : F extends Partial<
      QueryParameter<ObservableInputFunction, HTTPRequestMethods>
    >
  ? []
  : never;

type QueryProviderQuerConfigType = {
  name: string;
  observe?: ObserveKeyType;
};
export type CacheQueryProviderType = QueryProviderType & {
  cacheConfig: CacheQueryConfig & QueryProviderQuerConfigType;
};
