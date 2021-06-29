// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  testUser: 'AppSysAdmin',
  testUserPassword: '',
  applicationUniqueID: 'ELEWOU_ADMIN_',
  userInfoStorageKey: 'ELEWOU_ADMIN_USER_INFO',
  authTokenStorageKey: 'ELEWOU_ADMIN_X_AUTH_TOKEN',
  authRememberTokenStorageKey: 'ELEWOU_ADMIN_AUTH_REMEMBER_TOKEN',
  forms: {
    roles: 13,
    authorizations: 2,
    identification_employeur: 2,
    users: 14,
    departments: 18,
    modules: 15
  },
  APP_SERVER_URL: 'http://127.0.0.1:8000/',
  APP_FILE_SERVER_URL: 'http://127.0.0.1:8000/api/',
  APP_SECRET: 'V1HQkt03PoGdlxN',
  AUTH_SERVER_URL: 'http://127.0.0.1:8000/',
  FORM_SERVER_URL: 'http://127.0.0.1:8000/',
  isDepartmentWorkspaceEnabled: false,
  isModulesWorkspaceEnabled: false,
  isFormsWorkspaceEnabled: true,
  isConfigurationWorkspaceEnabled: false,

  endpoints: {
    forms: 'api/v1/forms',
    formControls: 'api/v1/form-controls',
    controlOptions: 'api/v1/form-control-options'
  },
  appRoutes: {
    managementsRoute: 'managements',
    accountRoute: 'account',
    rolesManagementRoute: 'roles',
    createRole: 'roles/create',
    updatedRoleRoute: 'roles/update',
    createUsersRoute: 'users/create',
    updatedUserRoute: 'users/update',
    listUsersRoute: 'users/list',
    formsManagementRoute: 'forms',
    createFormsRoute: 'forms/create',
    modulesManagementRoute: 'modules',
    createModulesRoute: 'modules/create',
    updateModulesRoute: 'modules/update',
    departmentManagementRoute: 'departments',
    createDepartmentRoute: 'department',
    globalConfigurationsRoute: 'configurations-globales',
    controlOptionsRoute: 'form-control-options',
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
