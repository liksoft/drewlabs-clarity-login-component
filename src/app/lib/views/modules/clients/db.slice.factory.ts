import { QueryConfigType } from '@azlabsjs/ngx-azl-cache';
import { ConfigurationManager } from "@azlabsjs/ngx-config";
import { configsDbNames } from "src/app/lib/bloc";
import { environment } from "src/environments/environment";

export const clientsDbConfigs = {
  categories: "clients.members.categories",
  types: "clients.members.types",
  status: "clients.members.status"
};

export function clientsDbSlice(config?: ConfigurationManager): QueryConfigType[] {
  return [
    {
      endpoint: `${config?.get(
        "api.host",
        environment.api.clients.host
      )}/${config?.get(
        "api.clients.endpoints.categories",
        environment.api.clients.endpoints.categories
      )}`,
      key: clientsDbConfigs.categories,
      // cacheConfig: {
      //   refetchInterval: 10000
      // }
    },
    {
      endpoint: `${config?.get(
        "api.host",
        environment.api.clients.host
      )}/${config?.get(
        "api.clients.endpoints.types",
        environment.api.clients.endpoints.types
      )}`,
      key: clientsDbConfigs.types,
    },
    {
      endpoint: `${config?.get(
        "api.clients.host",
        environment.api.clients.host
      )}/${config?.get(
        "api.clients.endpoints.status",
        environment.api.clients.endpoints.status
      )}`,
      key: clientsDbConfigs.status,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.agencies",
        environment.api.configurations.endpoints.agencies
      )}`,
      key: configsDbNames.agencies,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.civilstates",
        environment.api.configurations.endpoints.civilstates
      )}`,
      key: configsDbNames.civilstates,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.businesslinks",
        environment.api.configurations.endpoints.businesslinks
      )}`,
      key: configsDbNames.businesslinks,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.activitysectors",
        environment.api.configurations.endpoints.activitysectors
      )}`,
      key: configsDbNames.activitysectors,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.genders",
        environment.api.configurations.endpoints.genders
      )}`,
      key: configsDbNames.genders,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.maritalstatuses",
        environment.api.configurations.endpoints.maritalstatuses
      )}`,
      key: configsDbNames.maritalstatuses,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.legalforms",
        environment.api.configurations.endpoints.legalforms
      )}`,
      key: configsDbNames.legalforms,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.zones",
        environment.api.configurations.endpoints.zones
      )}`,
      key: configsDbNames.zones,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.countries",
        environment.api.configurations.endpoints.countries
      )}`,
      key: configsDbNames.countries,
    },
    // {
    //   endpoint: `${config?.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config?.get(
    //     "api.configurations.endpoints.currencies",
    //     environment.api.configurations.endpoints.currencies
    //   )}`,
    //   key: configsDbNames.currencies,
    // },
    // TODO : Provide a dedicated loader for the slices below
    // {
    //     endpoint: `${config?.get(
    //       "api.configurations.host",
    //       environment.api.configurations.host
    //     )}/${config?.get(
    //       "api.configurations.endpoints.stakeholdertypes",
    //       environment.api.configurations.endpoints.stakeholdertypes
    //     )}`,
    //     key: configsDbNames.stakeholdertypes,
    //   },
    // {
    //   endpoint: `${config?.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config?.get(
    //     "api.configurations.endpoints.financialorganizations",
    //     environment.api.configurations.endpoints.financialorganizations
    //   )}`,
    //   key: configsDbNames.financialorganizations,
    // },
  ];
}
