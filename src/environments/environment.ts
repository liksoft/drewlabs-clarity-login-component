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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJlNjBhYmMyZTkyOWM2NTA5NjI4YjlmZGU0YzIyMGM4M2M3Zjk1ZTFlODIxODQ0YzkyMTgxOTk2ZGRkYjViZWE1OTU2MzAzMmY4YjU2NmMwYSIsImlhdCI6MTY3MTk4MTcwOC42MTk2NDYsIm5iZiI6MTY3MTk4MTcwOC42MTk2NSwiZXhwIjoxNjcyMDY4MTA4LjYwOTYzLCJzdWIiOiIxMyIsInNjb3BlcyI6WyJjb29wZWM6Y3VzdG9tZXJzOm1lbWJlcnNoaXBzOmxpc3QiXX0.OjCGdSsIloUkwxVy42hRInZvBIgJksYW_0YxiyIhRUhajPp2qwq__IwEZR9a27Ql1pAmpDAgEFc1N0vqs5r_4C-nYpoF2__6n3YuDdY88E8ryD98lqXpPk-pMLM96f9pm7Mx90i_Ctyb44mJz97j0cia8pIbHYcWxIQ0W-91iyIvzhwYN5n1jgWcolkv0TWpD8aAAMZ-ZBCSX7u7vU55K8KWh_V9EqTbwUxu4L5lgxZhPo9pebW-UtU0l54KXZIesrDwIB-r8lQ2v6FT5L_hfWgLRRFUY7g0OkOSPQMweE2K08HThUqKDgIAsq0sJbLcXu-4n1hR78_SQTanmnrlJQm6JCRUK3hj13Vl-E8cxEMM24ZUvSoA7BTVg5eqFlzex74AxuoaVENHqE4lX_zVx6rxydkt9J7PhoIGToYwb9KtkeXXoFb2nZzLhhw0y2-qyHxbGD4w2zJniUfpcFtHUBLJgx522a41mBQPN4EHXex9p-12cVXFijUplShNNEmd5TPdidq7egdg9-ddADjcfiVXc6TksiiiPGxYHUTm_ZBvVe2hY1JZ2DI7HmtZ6P6Y27jm3GEqWtOCz8I6gUMwRWu68NWwhmGzoZLgG5aG8kqT98A-1b9sxnPzl95GJLIEVE_QuHrlYZymAhTnDTdnVo6CUiYRRT-Dn18Xfabtmwg",
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

