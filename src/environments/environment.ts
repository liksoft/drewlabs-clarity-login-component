// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  testUser: "AppSysAdmin",
  testUserPassword: "",
  applicationUniqueID: "CNSS_PAYMENTS_ADMIN_",
  userInfoStorageKey: "CNSS_PAYMENTS_ADMIN_USER_INFO",
  authTokenStorageKey: "CNSS_PAYMENTS_ADMIN_X_AUTH_TOKEN",
  authRememberTokenStorageKey: "CNSS_PAYMENTS_ADMIN_AUTH_REMEMBER_TOKEN",
  forms: {},
  APP_SERVER_URL: "https://forms.lik.tg/",
  APP_FILE_SERVER_URL: "https://forms.lik.tg/",
  APP_SECRET: "V1HQkt03PoGdlxN",
  AUTH_SERVER_URL: "https://forms.lik.tg/",
  FORM_SERVER_URL: "https://forms.lik.tg/",
  endpoints: {
    forms: "api/forms",
    formControls: "api/form-controls",
    controlOptions: "api/form-control-options",
    controlBindings: "api/control-bindings",
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
