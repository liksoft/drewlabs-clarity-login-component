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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTk3ODJFMS05QTJGLTQ5QTQtOUQ0Mi1CNTlBNzhFNTIwRkIiLCJqdGkiOiI4Y2FhMWZmMmNiYTc1MjEzZTIyYWFkMjVjY2ExNjgyZmFlZDI0YTk5MzNjYjQyMjQ3OGIzODU4ODhhNGU0Y2FiMTNiNzY2MTU2ZjgzNTUzYyIsImlhdCI6MTY3MjY1Mzg2My41MzAzMjUsIm5iZiI6MTY3MjY1Mzg2My41MzAzMjksImV4cCI6MTY3Mjc0MDI2My41MjAzMTgsInN1YiI6IjEzIiwic2NvcGVzIjpbImNvb3BlYzpjdXN0b21lcnM6bWVtYmVyc2hpcHM6bGlzdCJdfQ.iCbV1PklE5TagTPjOTzmQFP2HwiPeCXxJcTQvLyKE_mdIfoVSRytIzrC3mdvbbNL0IEUdUH4VxBorfNifKIzGg_5XfQAKergA73bWC83AoWUNnhYtLfZUusMue6t-DmsPA7RT2TGUiKbDu6fpTJfPrk1CX-y6xzs3GwhPObXcrCpYFfIgCDAFYeYerYSmR-kSHrRtmiW52ga37dIEzIJJlzhz08Lb8b5etQIBhv636f5LeX4iAjUyu0TTZVCHkXXwkKqL6HvtA3Ok39Ifh0Xf0JXZsvZTabStXpSO4qwaI5yXuG23K-qWXegVLaxRNXHlPgaYCQq4jerx1-4w5-xzhhdULlAvZpUSklMdIS3BsuYJsDYIsMG_8OiSKUgPs62hfC4nJgQKep8o_5I-LdPeY6QvUNf92oIC51ldZ1BxTNo9KYFzHzKNzWHFtcr7PM9jTXmqKfeKqE0Mk5H_HzcudpmJLQf4regvHIZUAo9lqPtPUGbQMruCeNyKe8rH0PREcUGwo8LGmdDRy28HsxLoN5FefCXVYsrgQIXB1q7qtbsm0vyc0z31qdXugYzrDb6J8w_z2acmwTNmbD58jaODQYRNyxqNFGv5fxWAjhQR5aFfKJKcdFYccpWhVPxPqhLLYt-elZ_R0foAsn-hPlsKTCni63nU4IU-0UpVAJjCQo",
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
