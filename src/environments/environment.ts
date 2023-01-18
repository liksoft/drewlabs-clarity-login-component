// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { RestQueryType } from "src/app/lib/views/modules/datagrid";

const caching = {
  keys: {
    settings: {
      agencies: "configurations.agencies",
      civilstates: "configurations.civil-states",
      businesslinks: "configurations.business-links",
      activitysectors: "configurations.activity-sectors",
      genders: "configurations.genders",
      maritalstatuses: "configurations.marital-statuses",
      legalforms: "configurations.legal-forms",
      stakeholdertypes: "configurations.stake-holder-types",
      zones: "configurations.zones",
      countries: "configurations.countries",
      currencies: "configurations.currencies",
      financialorganizations: "configurations.financial-organizations",
    },
    clients: {
      categories: "clients.members.categories",
      types: "clients.members.types",
      status: "clients.members.status",
    },
  },
};

export const environment = {
  production: false,
  applicationUniqueID: "COOPECTRASTO_ADMIN_",
  userInfoStorageKey: "COOPECTRASTO_ADMIN_USER_INFO",
  authTokenStorageKey: "COOPECTRASTO_ADMIN_X_AUTH_TOKEN",
  authRememberTokenStorageKey: "COOPECTRASTO_ADMIN_AUTH_REMEMBER_TOKEN",
  forms: {
    host: "https://coopecclients.lik.tg/",
    endpoints: {
      bindingsPath: "api/v2/control-bindings",
    },
    views: {
      createIndividualClient: 218,
      createMoralClient: 219,
      createStakeHolder: 220,
    },
    upload: {
      clientid: "96a6bba2-73e4-404c-9bb3-0d61c31bba44",
      clientsecret:
        "9NYHbYhzNXX2AbrxHs4H0cTmM7udeKEdqfwyTCXGLjnaU2IhmVldNwAknIpysbx5QZ8KBytvw1hW7qQE6iA",
    },
  },
  api: {
    clients: {
      host: "https://coopecclients.lik.tg/",
      endpoints: {
        members: "api/members",
        addresses: "api/addresses",
        individuals: "api/individuals",
        morals: "api/morals",
        types: "api/member-types",
        categories: "api/member-categories",
        status: "api/membership-statuses",
        stakeholders: "api/account-stake-holders",
        customers: "api/customers",
      },
    },
    configurations: {
      host: "https://coopecsettings.lik.tg/",
      endpoints: {
        agencies: "api/agencies",
        civilstates: "api/civil-states",
        businesslinks: "api/business-links",
        activitysectors: "api/activity-sectors",
        genders: "api/genders",
        maritalstatuses: "api/marital-statuses",
        legalforms: "api/legal-forms",
        stakeholdertypes: "api/stake-holder-types",
        zones: "api/zones",
        countries: "api/countries",
        currencies: "api/currencies",
        financialorganizations: "api/financial-organizations",
      },
    },
  },
  auth: {
    host: "https://auth.lik.tg/",
    clientID: "859782E1-9A2F-49A4-9D42-B59A78E520FB",
    clientSecret:
      "wJa60mWPUK2W8AycfziCrWeMWSus4HLAoSV9cq2qb6FTMlmEudoItlbUHwdUw15peIXmF2b2q2LwCYSO0fvvgQ",
  },
  storage: {
    secret: "V1HQkt03PoGdlxN",
    prefix: "coopectrasto_",
  },
  testing: {
    _authToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJjNGQ3ZTFiNTFlOGNhNjYxODMxZTFlMTAyMTdiYjcxNjc0ZjBmZDkzODY2MzkzY2Q4NzY3ZDI0ZWU3ZGMwMTk2ZWM5ZjZlYmExOWJlOWQ3ZiIsImlhdCI6MTY3Mzk0OTk4NS4xNjM3NiwibmJmIjoxNjczOTQ5OTg1LjE2Mzc2NSwiZXhwIjoxNjc0MDM2Mzg1LjE2MDUzMywic3ViIjoiMTMiLCJzY29wZXMiOlsiY29vcGVjOmN1c3RvbWVyczptZW1iZXJzaGlwczpsaXN0Il19.tiDoH_EDSEQNMRbtbOZ9JkQpBAN7G9dGUz_g4W9FYOgqjnOJW2NzhTUzXMPcpzzj1EAukk4bZt4uo6CUZePsHu9VAn5pZxXzLkXzx-QamGfppvlEofjYkacXcZBY5RIci52wgyKpY4CrWWkjf0L-Tkdo_Bm-oSj3KtXrK93kUwC64G1Crck6aFgZIz1cx27X8QSaH3u_51UbP24QPKCh2rZfG7WAMGRMU60GlOQCP4g_b3OVw7BXh2MchAh7ApYnU_rOlW3ZCxS3BgLbdKpzayjHM-amSuXxF8HhmWJSBk3xR-4w0-nai2TUIaJpCmnowetDphA0awGC1mvo9XY7ZoCRzJuh3lMhCsPWZ0vK7Q8d3y-d3DIxPV394GgetajfGcNGz3fQjIvlfP2JTvUJ7TKrqzby9gP7-hLZvcruynLw63irbyOuHTHTgnFacUPg4-ZdJ0Yn6WwWKrJ7uMNeRes3Hp-52nTBvtNk44rCms3yheDrjrXkErQ24rxYERXjAnUSXCD2TaU0YibpqqEMgK5K5HnvHSWK9ZMEu9B9T7OnhTgP7t5ikQi8LJN9SYeJo0J5wJ4u5KtMmu45esHJ0Hs1PKuJSbgSs9pjA_nmK2-9dIsBrZZSrMwEnmEJyyhO3elImTzVdIV7SW2JcOx-ghpmRH7GGkA5CVuDplwqRkY",
  },
  app: {
    caching,
    clients: {
      morals: {
        datagrid: {
          columns: [
            {
              title: "N° membre",
              label: "accountNumber",
            },
            {
              title: "Régistre du commerce",
              label: "registrynumber",
            },
            {
              title: "Raison sociale",
              label: "label",
              transform: "uppercase",
            },
            {
              title: "Téléphone",
              label: "phonenumber",
            },
            {
              title: "Type",
              label: "type",
              transform: `azlcache:${caching.keys.clients.categories}`,
            },
            {
              title: "Secteur activité",
              label: "activitysector",
              transform: `azlcache:${caching.keys.settings.activitysectors}`,
            },
            {
              title: "Activité",
              label: "activity",
            },
            {
              title: "Statut",
              label: "status",
              transform: `azlcache:${caching.keys.clients.status}`,
            },
          ],
          query: {
            _filters: [],
            _columns: ["*", "member", "address"],
            _excepts: [],
            // _query: []
          } as RestQueryType,
        },
      },
      individuals: {
        datagrid: {
          columns: [
            {
              title: "N° membre",
              label: "accountNumber",
            },
            {
              title: "Date Ouv.",
              label: "validatedAt",
              transform: "date",
            },
            {
              title: "Nom",
              label: "lastname",
              transform: "uppercase",
            },
            {
              title: "Prénoms",
              label: "firstname",
              transform: "uppercase",
            },
            {
              title: "Lien d'affaires",
              label: "businesslink",
              transform: `azlcache:${caching.keys.settings.businesslinks}`,
            },
            {
              title: "Type",
              label: "type",
              transform: `azlcache:${caching.keys.clients.categories}`,
            },
            {
              title: "Téléphone",
              label: "phonenumber",
            },
            {
              title: "Civilité",
              label: "civility",
              transform: `azlcache:${caching.keys.settings.civilstates}`,
            },
            {
              title: "Activité",
              label: "activity",
            },
            {
              title: "Statut",
              label: "status",
              transform: `azlcache:${caching.keys.clients.status}`,
            },
          ],
          query: {
            _filters: [],
            _columns: ["*", "member", "by.address"],
            _excepts: [],
            // _query: []
          } as RestQueryType,
        },
      },
      stakeholders: {
        datagrid: {
          columns: [
            {
              title: "ID",
              label: "id",
            },
            {
              title: "N° membre",
              label: "number",
            },
            {
              title: "N° compte",
              label: "accountnumber",
            },
            {
              title: "Date Enr.",
              label: "createdAt",
              transform: "date",
            },
            {
              title: "Nom",
              label: "lastname",
              transform: "uppercase",
            },
            {
              title: "Prénoms",
              label: "firstname",
              transform: "uppercase",
            },
            {
              title: "Téléphone",
              label: "contact",
            },
          ],
          queries: {
            beneficiaries: {
              _columns: ["*", "customer.address"],
              _excepts: [],
              // _query: []
            } as RestQueryType,
            representatives: {
              _columns: ["*", "customer.address"],
              _excepts: [],
              // TODO: Add a query that make sure members are filtered based on the representave tag
              // _query: []
            } as RestQueryType,
          },
        },
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
