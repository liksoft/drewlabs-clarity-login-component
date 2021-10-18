import { NgModule, LOCALE_ID, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard.component';
import { AuthGuardService } from 'src/app/lib/core/auth/core';
import { AdminDashboardHomeComponent } from './home/home.component';
import {
  FormsComponent,
  ListformsComponent,
  FormControlAddComponent,
  FormControlComponent,
  FormsViewComponent,
  ControlOptionsComponent,
  ControlOptionViewComponent
} from '../forms';
import {
  ModulesComponent,
  AddmoduleComponent
} from '../modules';
import {
  RolesComponent,
  RoleListComponent,
  AddRoleComponent,
  AddRoleFormComponent,
  RoleListPresenterComponent
} from '../roles';
import {
  UserListComponent,
  AddUserComponent,
  UsersComponent,
  AddUserFormComponent
} from '../users';
import {
  partialConfigs
} from '../../../partials/partials-configs';
import {
  ListDepartmentComponent,
  AddDepartementComponent,
  DepartmentComponent
} from '../department';
import { AppNavComponent } from './app-nav/app-nav.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdatePasswordViewComponent } from './settings/update-password-view/update-password-view.component';
import { AuthorizationsGuard } from '../../../../core/auth/core/auth-guard.service';
import { environment } from 'src/environments/environment';
import { AUTH_RESOURCES_AUTHORIZATIONS } from '../../../authorizations';


export const getRoutes = () => {

  const appRoutes = environment?.appRoutes;
  const adminAuthorizations = AUTH_RESOURCES_AUTHORIZATIONS;

  const childRoutes: Routes = [
    {
      path: '',
      component: AdminDashboardComponent,
      pathMatch: 'full',
      redirectTo: partialConfigs.routes.commonRoutes.homeRoute,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: partialConfigs.routes.commonRoutes.homeRoute,
      component: AdminDashboardHomeComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    }, // account component route
    {
      path: `${appRoutes.accountRoute}`,
      component: SettingsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: appRoutes.managementsRoute,
      component: UsersComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.createUsersRoute}`,
      component: AddUserComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
        formID: environment.forms.users
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.updatedUserRoute}/:id`,
      component: AddUserComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
        formID: environment.forms.users
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.listUsersRoute}`,
      component: UserListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.rolesManagementRoute}`,
      component: RolesComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.createRole}`,
      component: AddRoleComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    },
    {
      path: `${appRoutes.managementsRoute}/${appRoutes.updatedRoleRoute}/:id`,
      component: AddRoleComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations
      }
    }
  ];
  if (environment.isDepartmentWorkspaceEnabled) {
    childRoutes.push(...[
      {
        path: `${appRoutes.managementsRoute}/${appRoutes.departmentManagementRoute}`,
        component: ListDepartmentComponent,
        canActivate: [AuthGuardService, AuthorizationsGuard],
        data: {
          authorizations: adminAuthorizations
        }
      },
      {
        path: `${appRoutes.managementsRoute}/${appRoutes.createDepartmentRoute}`,
        component: DepartmentComponent,
        canActivate: [AuthGuardService, AuthorizationsGuard],
        data: {
          authorizations: adminAuthorizations
        }
      },
      {
        path: `${appRoutes.managementsRoute}/${appRoutes.createDepartmentRoute}/:id`,
        component: DepartmentComponent,
        canActivate: [AuthGuardService, AuthorizationsGuard],
        data: {
          authorizations: adminAuthorizations
        }
      }
    ]);
  }
  if (environment.isModulesWorkspaceEnabled) {
    childRoutes.push(
      ...[

        {
          path: `${appRoutes.managementsRoute}/${appRoutes.modulesManagementRoute}`,
          component: ModulesComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations
          }
        },
        {
          path: `${appRoutes.managementsRoute}/${appRoutes.createModulesRoute}`,
          component: AddmoduleComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations
          }
        },
        {
          path: `${appRoutes.managementsRoute}/${appRoutes.updateModulesRoute}/:id`,
          component: AddmoduleComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations
          }
        },
      ]
    );
  }
  if (environment.isFormsWorkspaceEnabled) {
    childRoutes.push(
      ...[

        {
          path: `${appRoutes.managementsRoute}/${appRoutes.formsManagementRoute}`,
          component: ListformsComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations
          }
        },
        {
          path: `${appRoutes.managementsRoute}/${appRoutes.createFormsRoute}`,
          component: FormsComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations,
            formID: environment.forms.forms,
            controlsFormID: environment.forms.controls
          }
        },
        {
          path: `${appRoutes.managementsRoute}/${appRoutes.createFormsRoute}/:id`,
          component: FormsComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations,
            formID: environment.forms.forms,
            controlsFormID: environment.forms.controls
          }
        },
        {
          path: `${appRoutes.managementsRoute}/${appRoutes.controlOptionsRoute}`,
          component: ControlOptionsComponent,
          canActivate: [AuthGuardService, AuthorizationsGuard],
          data: {
            authorizations: adminAuthorizations,
            formID: environment.forms.controlOptions
          }
        }
      ]
    );
  }
  return [
    {
      path: '',
      component: AdminDashboardComponent,
      canLoad: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      canActivate: [AuthGuardService],
      children: childRoutes
    }
  ] as Routes;
};

@NgModule({
  imports: [RouterModule.forChild(getRoutes())]
})
export class AdminDashboardRoutingModule { }

export const MODULE_DECLARATIONS = [
  AdminDashboardHomeComponent,
  AdminDashboardComponent,
  FormsComponent,
  FormsViewComponent,
  FormControlComponent,
  ListformsComponent,
  ModulesComponent,
  AddmoduleComponent,
  UsersComponent,
  AddUserComponent,
  RolesComponent,
  RoleListComponent,
  AddRoleComponent,
  AddRoleFormComponent,
  RoleListPresenterComponent,
  UserListComponent,
  FormControlAddComponent,
  ListDepartmentComponent,
  DepartmentComponent,
  AddDepartementComponent,
  AddUserFormComponent,

  // Navigation component
  AppNavComponent,

  // Accounts & Settings components
  SettingsComponent,
  UpdatePasswordViewComponent,


  // Form control options
  ControlOptionViewComponent,
  ControlOptionsComponent,
];

export const COMPONENTS_PROVIDERS: Provider[] = [
  { provide: LOCALE_ID, useValue: 'fr' }
];
