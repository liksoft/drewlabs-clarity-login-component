// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
        addresses: "api/addresses",
        individuals: "api/individuals",
        morals: "api/morals",
        types: "api/member-types",
        categories: "api/member-categories",
        status: 'api/membership-statuses'
      },
    },
    configurations: {
      host: "https://coopecsettings.lik.tg/",
      endpoints: {
        agencies: "api/agencies",
        civilstates: 'api/civil-states',
        businesslinks: 'api/business-links',
        activitysectors: 'api/activity-sectors',
        genders: 'api/genders',
        maritalstatuses: 'api/marital-statuses',
        legalforms: 'api/legal-forms',
        stakeholdertypes: 'api/stake-holder-types',
        zones: 'api/zones',
        countries: 'api/countries',
        currencies: 'api/currencies',
        financialorganizations: 'api/financial-organizations'
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiI3M2I1NDYzMjc0NjdiZTRkZjg0NjI1Mjk1YjcxNGY2ODQyZjM1NjkzMzcwNWNmNzhkZjNkZjljZDZmMzI2NDRmOGY5ZmVkNWZmMWNjYzg4NCIsImlhdCI6MTY3Mjc0MDUxMS42NzQ0OTYsIm5iZiI6MTY3Mjc0MDUxMS42NzQ1LCJleHAiOjE2NzI4MjY5MTEuNjYyODQ4LCJzdWIiOiIxMyIsInNjb3BlcyI6WyJjb29wZWM6Y3VzdG9tZXJzOm1lbWJlcnNoaXBzOmxpc3QiXX0.uPCABieYNvRyz5dGEdAaQEW-ceqiXb9VDm8lt2S8Abdx5Mz-2zaED5TkPCCzYrQNjuMiQsg3_nawczRDQCzYsQ0UI2KyiQb0kz981NWIevtfK9KkQ-bBUiT_9Pzuc2ICsi7LtlmBJ7tGoNQ4FdyR5jgxxzfz9H6Ooe3a4oYqG62-AaBmcq0QbtJtKR2YlBdiCgj2CaBbqfbmfev44N_ot190iFSINJkUUAk1P0y9qgZfgR8s4pQanGaYVfzckwe0ZEE5ORwtvlsB86p3bhrTPvoJSjRICwmwvV0B3oDgtsrSfs4vJ2MNyG_PT241jxBX24STTlaPQj4eHfpvC1GF3boCTWU3LxobIBvajV1Igqg1cWj5d6vbUEz_iK-ZXF2CY-ehmBY9cXrDEc-zPD4l_Ef-aR6FJ56H4n_QbcQeix-fuc5Xr4wOEHSWLrLbhKIYt9NDdz_ZcqUt6SL1HFmpbLBXK3NVfkjavUchpjLF92PZF2_825DsSqmEtbRKheKj3T2aIjs9JGUPYsJHh6rNCa0I-cEZA5AE8d2KqVr2KvNDs7ql_SXpSl-jSnzr2_osxgXKsgc9HVzDLDoUtyLg-KafjD8uErv9jU5SC_-g15nyDaYwtR-jQjaPjpBbzQ6VGiO0ShiERd1fWY72NVRWgV00aDpILWRIjtfcy9nCmgM",
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
