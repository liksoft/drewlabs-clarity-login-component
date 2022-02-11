// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  applicationUniqueID: "CNSS_PAYMENTS_ADMIN_",
  userInfoStorageKey: "CNSS_PAYMENTS_ADMIN_USER_INFO",
  authTokenStorageKey: "CNSS_PAYMENTS_ADMIN_X_AUTH_TOKEN",
  authRememberTokenStorageKey: "CNSS_PAYMENTS_ADMIN_AUTH_REMEMBER_TOKEN",
  APP_FILE_SERVER_URL: "https://cnss.payments.lik.tg/",
  APP_SECRET: "V1HQkt03PoGdlxN",
  forms: {
    host: "https://cnss.payments.lik.tg/",
    endpoints: {
      forms: "api/forms",
      formControls: "api/form-controls",
      optionsPath: "api/form-control-options",
      bindingsPath: "api/control-bindings",
    },
  },
  api: {
    host: "https://cnss.payments.lik.tg/",
  },
  auth: {
    host: "https://cnss.payments.lik.tg/",
    clientID: "50C6D414-BB92-48F8-B878-155861525EF4",
    clientSecret:
      "1xR.h7DoqKesCMlweGoMgQI3t.5AAjV84ORld3n6FxspouXBXZ7O.GVitXhONGZuYv1vUEcQ9yNNgcIisfhqNA",
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
