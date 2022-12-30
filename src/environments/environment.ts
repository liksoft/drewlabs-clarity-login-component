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
        addresses: "api/v1/addresses",
        individuals: "api/v1/individuals",
        morals: "api/v1/morals",
        memberTypes: "api/member-types",
        memberCategories: "api/member-categories"
      },
    },
    configurations: {
      host: "https://coopecsettings.lik.tg/",
      endpoints: {
        agencies: "api/agencies",
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiI0MGU5YzI4Y2Q0MWRkZDhlNDdiZGZlNzVkYjY2YmU1YTc5ZTRiMTU4OWIxMzQ1YWQyMjg4ZmVmMTY2ZDJjYjgxM2MxNDgxMzZjZWI2ZWNiMSIsImlhdCI6MTY3MjI2MDUwMS45NjIxMTYsIm5iZiI6MTY3MjI2MDUwMS45NjIxMTksImV4cCI6MTY3MjM0NjkwMS45NjAyNDEsInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.I0j8xEa93wxmxwY9_JpgPR5RPtPDRTo6ro2QKJCo0HOIfpS3XpijjQSP4ZbZzgVIsg4LLhNQTV-m4TpytiCp8yBXw9QAc93gbiiyZBUjG5i0xT7U8hWSIm76ATF8dXL8B4qILHjmoWYu-xc1wk5_vKU4LbuK9TRB7dVkCA7xfK0BBVoY69N6tA359Vt0O6B3QpgFVLhQBh6RUxPZg0R9KdwcNWsrq0jz-xS_3h4mENA9NuaLxrcrVGe93YBd-8kFc84BdXNcWY0zkNGvjJw36NPIm_BeDAj15Jp2f6alde3kw19aYbjPmdpyBG5V-YLUCAvh5BJm5pZghRSCKFkvbCHZ_cb1Ci8AGmHaGOjPtehQDsG5YR8NmccWvzAphJmXnBHF9vAJWmwfSGacB4UdsxnzjZy92uDLE_P0z8pkk3jVPWwjUTtACX5bKyDxNRxhqSWiLNkwxiUxlGXzjzszBb4mtFWl8QiNXQtHrI8D2Q7oAIaBfgiPo_kqZqIfR49W1D39FVusCaKhLAgkMnWqHqB50UdoG_0vfvY0HAs813n2u8QPiHww44rmDhQqPj8Pu5rdhvSUXVxow9jjkviVhWY90onIF4RPibMSYdEMVzzIT5mqDqB4Juso8PComBTciVqi-zBiqt5ykLI16CH9uodv9vGI0lLvjpwv0PKLm8E",
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
