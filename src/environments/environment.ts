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
        addresses: "api/addresses",
        individuals: "api/individuals",
        morals: "api/morals",
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiJmNTUyOTBiYjE2YTM5NTJlNWY4NmZjY2E2ZWU5YmY5ZjY4Nzk0OGQ4NmUwYTRmODA4ODBjNjQwZWJkOGYyMDBmNWEyNjhhNWNhOWUzMjUzNiIsImlhdCI6MTY3MjUwODUwOC45MDg5MjgsIm5iZiI6MTY3MjUwODUwOC45MDg5MzIsImV4cCI6MTY3MjU5NDkwOC45MDE0NjksInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.L80DvvBWjtTrj93qky3T7hkkMOi1BBx96pJZ6_Ul4ltKP4Mhizh6JfOI8S4d9tH2r6G9ihYTXRk07RPeCma0ZjA1Av5_UYZRqwHNiR1UD4TvF2kH3aUMBcxfkvNBPTpm6LOykLu7klcpmM2dYRNZgkYOiGMSd16Nb9y4PmZt1zcj1-IjSqNpAwT5TVvFcTbaTRWM_qSz0kOUgjAsBsKJs_IVDOn2s8_UyJIS4dBiyqIaPZvz_7XpdAcZp5ZwM0xRgDc64xGAc_3IFYXrcLeEzlow50rbWXza-USP0x1TQr4L5n7N-SLvQOEOZ6vXBu26gvn5Wq-tbytKRfpDrbr1FRjz0TcpPw1AF-vyz19_8pGwoKK0z9S96r7_hF5eMxrunjG0A5J53Q6BHb8eUn7QwHbur9EhFOIljWFnCAhsdjePjB6S5obzQkLX54iLZ6NlfQItswKjmVKC2DCc1Mqe0j9Fq0RYqPAhshWlCokw71q6p9DdRKlCoUVsZmZjpzkvS_2rK4GeEygCtEWkgSmPUKxDSn-ornrpwXGQfMpEBSOaUO6znMsMDqvmIK-Cyx8Lv8d7cWrpVsPH08SvOTOUSjx-ZT8BOMKREzuLCxKrHowZTvyoZ5D-BPM2Mxu-jm88p9bQ8DKK-SeW8N5hpKNG6GCmbv7lKeIf2_1kiX3HlTQ",
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
