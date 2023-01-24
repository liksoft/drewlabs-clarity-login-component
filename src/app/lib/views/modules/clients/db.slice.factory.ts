import { QueryConfigType } from "@azlabsjs/ngx-azl-cache";
import { ConfigurationManager } from "@azlabsjs/ngx-config";
import { environment } from "src/environments/environment";

/**
 * Creates a cache slice the is required by client module views
 */
export function createClientCacheSlice(config: ConfigurationManager) {
  return [
    {
      endpoint: `${config.get(
        "api.host",
        environment.api.clients.host
      )}/${config.get(
        "api.clients.endpoints.categories",
        environment.api.clients.endpoints.categories
      )}`,
      key: config.get(
        "app.caching.keys.clients.categories",
        environment.app.caching.keys.clients.categories
      ),
      // cacheConfig: {
      //   refetchInterval: 10000
      // }
    },
    {
      endpoint: `${config.get(
        "api.host",
        environment.api.clients.host
      )}/${config.get(
        "api.clients.endpoints.types",
        environment.api.clients.endpoints.types
      )}`,
      key: config.get(
        "app.caching.keys.clients.types",
        environment.app.caching.keys.clients.types
      ),
    },
    {
      endpoint: `${config.get(
        "api.clients.host",
        environment.api.clients.host
      )}/${config.get(
        "api.clients.endpoints.status",
        environment.api.clients.endpoints.status
      )}`,
      key: config.get(
        "app.caching.keys.clients.status",
        environment.app.caching.keys.clients.status
      ),
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.agencies",
        environment.api.configurations.endpoints.agencies
      )}`,
      key: environment.app.caching.keys.settings.agencies,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.civilstates",
        environment.api.configurations.endpoints.civilstates
      )}`,
      key: environment.app.caching.keys.settings.civilstates,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.businesslinks",
        environment.api.configurations.endpoints.businesslinks
      )}`,
      key: environment.app.caching.keys.settings.businesslinks,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.activitysectors",
        environment.api.configurations.endpoints.activitysectors
      )}`,
      key: environment.app.caching.keys.settings.activitysectors,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.genders",
        environment.api.configurations.endpoints.genders
      )}`,
      key: environment.app.caching.keys.settings.genders,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.maritalstatuses",
        environment.api.configurations.endpoints.maritalstatuses
      )}`,
      key: environment.app.caching.keys.settings.maritalstatuses,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.legalforms",
        environment.api.configurations.endpoints.legalforms
      )}`,
      key: environment.app.caching.keys.settings.legalforms,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.professions",
        environment.api.configurations.endpoints.professions
      )}`,
      key: environment.app.caching.keys.settings.professions,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.zones",
        environment.api.configurations.endpoints.zones
      )}`,
      key: environment.app.caching.keys.settings.zones,
    },
    {
      endpoint: `${config.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config.get(
        "api.configurations.endpoints.countries",
        environment.api.configurations.endpoints.countries
      )}`,
      key: environment.app.caching.keys.settings.countries,
    },
    // {
    //   endpoint: `${config.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config.get(
    //     "api.configurations.endpoints.currencies",
    //     environment.api.configurations.endpoints.currencies
    //   )}`,
    //   key: environment.app.caching.keys.settings.currencies,
    // },
    // TODO : Provide a dedicated loader for the slices below
    // {
    //     endpoint: `${config.get(
    //       "api.configurations.host",
    //       environment.api.configurations.host
    //     )}/${config.get(
    //       "api.configurations.endpoints.stakeholdertypes",
    //       environment.api.configurations.endpoints.stakeholdertypes
    //     )}`,
    //     key: environment.app.caching.keys.settings.stakeholdertypes,
    //   },
    // {
    //   endpoint: `${config.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config.get(
    //     "api.configurations.endpoints.financialorganizations",
    //     environment.api.configurations.endpoints.financialorganizations
    //   )}`,
    //   key: environment.app.caching.keys.settings.financialorganizations,
    // },
  ] as QueryConfigType[];
}
