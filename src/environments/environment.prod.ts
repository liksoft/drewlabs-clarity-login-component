export const environment = {
  production: true,
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
    // host: '',
    host: "https://coopecclients.lik.tg/",
    endpoints: {
      clients: {
        addresses: "api/v1/addresses",
        individuals: "api/v1/individuals",
        morals: "api/v1/morals",
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
};