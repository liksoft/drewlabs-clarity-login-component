import { ConfigurationManager } from "@azlabsjs/ngx-config";
import { configsDbEnvironment } from "src/app/lib/bloc";
import { QueryConfigType } from 'src/app/libs/ngx-dbsync';
import { environment } from "src/environments/environment";

export const clientsDbConfigs = {
  memberCatories: "clients.members.categories",
  memberTypes: "clients.members.types",
};

export function clientsDbSlice(config?: ConfigurationManager): QueryConfigType[] {
  return [
    {
      endpoint: `${config?.get(
        "api.host",
        environment.api.clients.host
      )}/${config?.get(
        "api.clients.endpoints.memberCategories",
        environment.api.clients.endpoints.memberCategories
      )}`,
      key: clientsDbConfigs.memberCatories,
      // cacheConfig: {
      //   refetchInterval: 10000
      // }
    },
    {
      endpoint: `${config?.get(
        "api.host",
        environment.api.clients.host
      )}/${config?.get(
        "api.clients.endpoints.memberTypes",
        environment.api.clients.endpoints.memberTypes
      )}`,
      key: clientsDbConfigs.memberTypes,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.agencies",
        environment.api.configurations.endpoints.agencies
      )}`,
      key: configsDbEnvironment.agencies,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.civilstates",
        environment.api.configurations.endpoints.civilstates
      )}`,
      key: configsDbEnvironment.civilstates,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.businesslinks",
        environment.api.configurations.endpoints.businesslinks
      )}`,
      key: configsDbEnvironment.businesslinks,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.activitysectors",
        environment.api.configurations.endpoints.activitysectors
      )}`,
      key: configsDbEnvironment.activitysectors,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.genders",
        environment.api.configurations.endpoints.genders
      )}`,
      key: configsDbEnvironment.genders,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.maritalstatuses",
        environment.api.configurations.endpoints.maritalstatuses
      )}`,
      key: configsDbEnvironment.maritalstatuses,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.legalforms",
        environment.api.configurations.endpoints.legalforms
      )}`,
      key: configsDbEnvironment.legalforms,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.zones",
        environment.api.configurations.endpoints.zones
      )}`,
      key: configsDbEnvironment.zones,
    },
    {
      endpoint: `${config?.get(
        "api.configurations.host",
        environment.api.configurations.host
      )}/${config?.get(
        "api.configurations.endpoints.countries",
        environment.api.configurations.endpoints.countries
      )}`,
      key: configsDbEnvironment.countries,
    },
    // {
    //   endpoint: `${config?.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config?.get(
    //     "api.configurations.endpoints.currencies",
    //     environment.api.configurations.endpoints.currencies
    //   )}`,
    //   key: configsDbEnvironment.currencies,
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
    //     key: configsDbEnvironment.stakeholdertypes,
    //   },
    // {
    //   endpoint: `${config?.get(
    //     "api.configurations.host",
    //     environment.api.configurations.host
    //   )}/${config?.get(
    //     "api.configurations.endpoints.financialorganizations",
    //     environment.api.configurations.endpoints.financialorganizations
    //   )}`,
    //   key: configsDbEnvironment.financialorganizations,
    // },
  ];
}
