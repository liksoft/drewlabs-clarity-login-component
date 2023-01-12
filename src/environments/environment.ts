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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJmMDhiN2Y0NjJjZTY2OWIzZGIxYmZhNDI1ZDA5YzRkZjZjYzU4MjFlYjI1YWEwNjU4Zjk5ZjdiNWYzMWU2ZDZhMzc4MTFmY2ZhYjNkYzljOSIsImlhdCI6MTY3MzQ2NTUwOS44Nzc0MzEsIm5iZiI6MTY3MzQ2NTUwOS44Nzc0MzYsImV4cCI6MTY3MzU1MTkwOS44NzIzOTcsInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.ZQ98rLRmxnxDyk-evsXEVvfwiCD0XkZ6x6mFvMuXo5iqyhTPsg8ljHqUVVAsF1MFRhJcoA4kjccLn98h6WRxMFZmLtRAScHtveYihlRjboeD3BVPicbTTLuBiKD7idMWnfZvVI9fnvKpW9guDLjGnq0tyQ5xuYaLcoTc0Gf6hosJlU-3S8tobOjp8QHCVsvILX7GdH02L5oCpUpSmTktENVGuLt0IKwEkrx6gP_zeZTr5Ad-82019KQ1D-4THCnlRByjZ2z2TAoAoFfvPkHUDQJ9hroNEu3pOyWq9gnOIF6PX0MlBqQMD3jPDyRSnINkyqIrJW8gmgeQ2c09mnUSUFKJiQUx-wDEl_0TxG38oAzDRXyD3W9SKSVGASaIC2ql1zdRThLoEhyqDl8CNyw-LMD8Xe7Mt6Q-PtbQaMzGC6lTdBGCmcFLbIJrCwh1QmRMNwZxaVPhEtQb-9c7HXghBKJbBbMP7tBgFsidxsC-ghYkETquOp5mAuMZZ3BEs2ej2xQDZHgtlhXbYMS714X36xRgG7okpHmIOWkgBM1dPSN7vJA6FC6TWeHrZZqgBkWxQxOIXrfrX9Pkx-WQXiJcJq4vh9f-dPW3StobcuDla-YjfV3Vpwio-3YgaZ8SY7xG_vkNQ7tvQ2cFrOGanZUb5gMsX90LJQUP58UNIr3Z7n8",
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
