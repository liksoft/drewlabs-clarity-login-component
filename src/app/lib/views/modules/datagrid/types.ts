/**
 * REST API Query type
 */
export type RestQueryType = {
  _columns?: string[];
  _excepts?: string[];
  _filters?: { property: string; value: unknown }[];
  _query?: { [k: string]: any };
};
