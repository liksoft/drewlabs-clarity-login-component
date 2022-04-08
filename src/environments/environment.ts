// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  applicationUniqueID: "CNSS_PAYMENTS_ADMIN_",
  userInfoStorageKey: "CNSS_PAYMENTS_ADMIN_USER_INFO",
  authTokenStorageKey: "CNSS_PAYMENTS_ADMIN_X_AUTH_TOKEN",
  authRememberTokenStorageKey: "CNSS_PAYMENTS_ADMIN_AUTH_REMEMBER_TOKEN",
  APP_FILE_SERVER_URL: "https://auth.lik.tg/",
  APP_SECRET: "V1HQkt03PoGdlxN",
  forms: {
    host: "http://127.0.0.1:8000/",
    endpoints: {
      bindingsPath: "api/v2/control-bindings",
    },
  },
  api: {
    host: "http://127.0.0.1:8000/",
  },
  auth: {
    host: "https://auth.lik.tg/",
    clientID: "859782E1-9A2F-49A4-9D42-B59A78E520FB",
    clientSecret:
      "wJa60mWPUK2W8AycfziCrWeMWSus4HLAoSV9cq2qb6FTMlmEudoItlbUHwdUw15peIXmF2b2q2LwCYSO0fvvgQ",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
