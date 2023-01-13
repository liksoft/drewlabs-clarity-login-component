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
        members: "api/members",
        addresses: "api/addresses",
        individuals: "api/individuals",
        morals: "api/morals",
        types: "api/member-types",
        categories: "api/member-categories",
        status: 'api/membership-statuses',
        stakeholders: 'api/account-stake-holders'
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJhMDkzNjJiYzk0MDc4NmM5OTgxZDE1NjE4NThkZmRmNjJiMWExNGUyNjBmMDJjYzc0YTQ2NTk0ZjZlMGY2N2JkZDU1YWU4MjhlOWM1MzFjYSIsImlhdCI6MTY3MzU2MTIzNy4yMDI5NjYsIm5iZiI6MTY3MzU2MTIzNy4yMDI5NywiZXhwIjoxNjczNjQ3NjM3LjE5NDgxNiwic3ViIjoiMTMiLCJzY29wZXMiOlsiY29vcGVjOmN1c3RvbWVyczptZW1iZXJzaGlwczpsaXN0Il19.BVrZL4ha2bYX4j06oxSN540jPM-VtmwYRlE15lcO-9xJBirK_Xq8xIC2tWNbNX_BtdP2Vb6HMnbmjor4K_oqtAVR6VsFuxGq5zXw2kZlyooSiEe5BGK-VaH08mpJSHyViXTE1XZ34crmJXX2mDXeuzKw3146-xggQ4wEVWXEiQYdPioo4KalgsB4P30Mon-NqRbq1RzMaEl3goo4f09g8doZckcDU38N_OB1pRi8ynx3wWUCI-6EZC7dqFBYw9vAs4DmCdIfSifTs_B1yrt_qQO6ZzsLTwNQ537KTxwXL4iYWtONMJW_bUchYxSyhaQE9UQIPzgtFdTldA18Yh1HuRvM5uCe6SyrwlyRvC1OFWHWLBwm02NcO7uVhIlKH-RJZHpIGB1MBDs1dKqOHbvYJDlay4opkqbg15Y1qExs_SeW9PHTSCdckUku6N5IfopUQXp0W8ynMKc7EDdcATHkEAmZ_Wf5DZIGm0VMSaVbem0P04EIa4-hpkBdXG99Kp32uoP8YdTzHdFYyBaqXkV7bd8Twgl4NBGgFlgsDl12gGj9cIWOaQfFiHywEhNTDcQ_qVp-e0TJ4MR7I-kPBVDUVPAKErRvsWLPDEDvMfMgfpq5l3iG7SZLP7nLSCYIFKFniceeamggCtg434UNIt0jKk1tx0Ze9epbftIZnyUUy9Q",
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
