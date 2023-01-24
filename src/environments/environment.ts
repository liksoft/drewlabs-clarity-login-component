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
      professions: "configurations.professions",
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
        signatories: "api/moral-signatories",
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
        professions: "api/professions",
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJiZTMxODU0NzIxYjYzMTI1Yjc0Njg2ZmU0NDNlNGY3OTRjMzY3ZmU1MDA0NmUzZGY0YmNhOTVlMDg5ZjEyM2ZlNjIzM2ExYzExYTc3NWVlYSIsImlhdCI6MTY3NDA1Nzk2My42OTU5NTIsIm5iZiI6MTY3NDA1Nzk2My42OTU5NTUsImV4cCI6MTY3NDE0NDM2My42OTMxMzMsInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.f9Gtz7P5OzBH7bWiCyG2B6TaSikc2TeO6L6B4dXAYyO-Txt7c7QUbm_3nrSjuh291SDGRoHlwbq62e2d7nyNPXdt0-JxLMKc--XFC_d2g-j5HJTVYXC6NIX0yi5-1wwHI1vKjekBh9jtxYCkz-tI_wi8MicHBNbYXFbv3WPgtyT4XCuB17gnbpDF9A1d3M4AFxW5ZvjP3YPTBsGxZr1QU3r4wos-m3ydPCwekOGIgdze1yCIacy_R9L8qQEzgI4zISewVE8d4b_lgtA1rZDNBr0cSQCaTEy69ev7opR8NIGPmo1rmDnynUNyy_NVz4IJ0fdZMUQ32mjMy6_Fagojc5nHw7L4UGoBocGL0JOIPi-A1ahd0ySs0T1MY0WJFgkTVy3EB9M1hqXlkGZUA_QhIh0ge_E6RkYrYWyG96TtzOKlunSh41jEIhUS9_Gce_C0uSL_K5aHC41284SbR5TKlV1QMGWjGqV7lkJV3ixuSrHPkn-SZxV4ZvVrcJxGpk6DRZrxE8qEgXJagx6LCAog_ydc4_DuubpgpgTARzeXlk3eXwYq9uimWi1bz3OzHM_p48_H4YRd_UJpzUtCDdrQJo1-Mxe8Cfw3Yl7ALK8gZ-S-0DDSg8menO1BP2YdbvZuDU9AKOxkSfOtez77PZNxRbDdVs96NwEM2PEGaDUaEAY",
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
              title: "N° Régistre Comm.",
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
      signatories: {
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
            {
              title: "Profession",
              label: "profession",
              transform: `azlcache:${caching.keys.settings.professions}`,
            },
          ],
          query: {
            _columns: ["*", "customer.address"],
            _excepts: [],
          } as RestQueryType,
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
