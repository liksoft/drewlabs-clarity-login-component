import { DBSyncProviderType, SliceQueryType } from "./types";

/**
 * Creates a function for loading user provided slice
 */
export function sliceQueryfactory(provider: DBSyncProviderType) {
  return (query: SliceQueryType) => {
    provider.loadSlice(query);
  };
}
