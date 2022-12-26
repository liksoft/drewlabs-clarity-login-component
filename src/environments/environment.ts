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
  testing: {
    _authToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiI5OGNmZGZlNTZmOWM3MDUwNTQxOWVhNDgxNDEwZDAyYWYyNzYzZjNmODNhMzEwYTc1ZmUyYzc1NjgxYTdiMmQ3MTA3M2M0MDg1MmZhY2U5ZSIsImlhdCI6MTY3MjA2OTQ0OS40MTQ3MDQsIm5iZiI6MTY3MjA2OTQ0OS40MTQ3MDksImV4cCI6MTY3MjE1NTg0OS40MDY2MzYsInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.XgBR7zctsZmZtzZzjqUrA7wLay5gqwCqd5fOGFm8NcrM2rE_qGZavEd5jDG1p9VP4kD4z6fFKuYNXIxzj_a2o9vEJRn9YZ1lThFyZoOZ2MGTe6Y9PYF0XxT4GZ5O70vOHcyFmvgkdtKd2cSyWP7fVMC-azJcicn5n2ByXg2Hh2OotTIKrPtquEEwlJN-B-EL--vryYPbnKyncc7bo0A7mQRxN9Fc34GcZEC88FCdyDsYuRCnjN31JYQlgCiWrlXr4RnplLj37qIJoaGH4X-coP2bXz_cBeCuEqe85gr3dlTVqDSjOUiR0Xw0LTU3iAUyz5JavAg0kt7iD0qQfH2pfWpq4W5JLXEOJu9_bAIKHaUKDKU5vxtXKac1__h5KVcx1qTaVPcUGCq4QSlLTUO85LrMxD3RsvbAGX5nkgrRnPcZwpLDsxktYKegE7D90iv1btQystcUkEJpEom712LORP9n18wWjYHTdZpfZLmnyWSAO5mYU69gTWpBtvxowKeh-_mG-2ym3mrDFtGzSred5Zil9gbbsaBu-XOgKxTbVJtqQfEARCVXqA1gJFUE5AzNStbAPwfYq6CZ3Evt_B76J482_yTPSmPCeS7DFRCpKNR8vZLTmaPWW0N5RdUUzED_if7TuKQyxj-jRSESOteh3M0ZRp9cw6oyVAkxjbGaW64",
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

