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
