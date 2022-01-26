import { MemberViewComponent } from './pages/adhesion-membre/member-view/member-view.component';
import { AdhesionMembreComponent } from './pages/adhesion-membre/adhesion-membre.component';
import { NgModule, LOCALE_ID, Provider } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./dashboard.component";
import { AuthGuardService } from "src/app/lib/core/auth/core";
import { AdminDashboardHomeComponent } from "./home/home.component";
import { partialConfigs } from "../partials/partials-configs";
import { AppNavComponent } from "./app-nav/app-nav.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdatePasswordViewComponent } from "./settings/update-password-view/update-password-view.component";
import { AuthorizationsGuard } from "../../core/auth/core/auth-guard.service";
import { AUTH_RESOURCES_AUTHORIZATIONS } from "../authorizations";
import { MemberAddEditComponent } from './pages/adhesion-membre/member-add-edit/member-add-edit.component';
import { ProcurationsComponent } from './pages/procurations/procurations.component';

export const getRoutes = () => {
  const adminAuthorizations = AUTH_RESOURCES_AUTHORIZATIONS;

  const childRoutes: Routes = [
    {
      path: "",
      component: AdminDashboardComponent,
      pathMatch: "full",
      redirectTo: partialConfigs.routes.commonRoutes.homeRoute,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.homeRoute,
      component: AdminDashboardHomeComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsHomeRoute,
      component: AdhesionMembreComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsAddEditRoute,
      component: MemberAddEditComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsViewRoute,
      component: MemberViewComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.procurationsManageRoute,
      component: ProcurationsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
  ];
  return [
    {
      path: "",
      component: AdminDashboardComponent,
      canLoad: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      canActivate: [AuthGuardService],
      children: childRoutes,
    },
  ] as Routes;
};


@NgModule({
  imports: [RouterModule.forChild(getRoutes())],
})
export class AdminDashboardRoutingModule {}

export const MODULE_DECLARATIONS = [
  AdminDashboardHomeComponent,
  AdminDashboardComponent,

  // Navigation component
  AppNavComponent,

  // Accounts & Settings components
  SettingsComponent,
  UpdatePasswordViewComponent,
];

export const COMPONENTS_PROVIDERS: Provider[] = [
  { provide: LOCALE_ID, useValue: "fr" },
];
