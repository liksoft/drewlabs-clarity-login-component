export const environment = {
  production: true,
  applicationUniqueID: "CNSS_PAYMENTS_ADMIN_",
  userInfoStorageKey: "CNSS_PAYMENTS_ADMIN_USER_INFO",
  authTokenStorageKey: "CNSS_PAYMENTS_ADMIN_X_AUTH_TOKEN",
  authRememberTokenStorageKey: "CNSS_PAYMENTS_ADMIN_AUTH_REMEMBER_TOKEN",
  APP_FILE_SERVER_URL: "http://localhost:8300/",
  APP_SECRET: "Ouiyw3ckFv@O5H",
  forms: {
    host: "http://localhost:8300/",
    endpoints: {
      forms: "api/forms",
      formControls: "api/form-controls",
      optionsPath: "api/form-control-options",
      bindingsPath: "api/control-bindings",
    },
  },
  api: {
    host: "http://localhost:8300/",
  },
  auth: {
    host: "https://auth.lik.tg/",
    clientID: "859782E1-9A2F-49A4-9D42-B59A78E520FB",
    clientSecret:
      "wJa60mWPUK2W8AycfziCrWeMWSus4HLAoSV9cq2qb6FTMlmEudoItlbUHwdUw15peIXmF2b2q2LwCYSO0fvvgQ",
  },
};
