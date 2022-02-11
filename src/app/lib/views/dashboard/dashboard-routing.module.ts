import { MemberViewComponent } from "./pages/adhesion-membre/member-view/member-view.component";
import { AdhesionMembreComponent } from "./pages/adhesion-membre/adhesion-membre.component";
import { NgModule, LOCALE_ID, Provider } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardHomeComponent } from "./home/home.component";
import { partialConfigs } from "../partials/partials-configs";
import { AppNavComponent } from "./app-nav/app-nav.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdatePasswordViewComponent } from "./settings/update-password-view/update-password-view.component";
import { MemberAddEditComponent } from "./pages/adhesion-membre/member-add-edit/member-add-edit.component";
import { ProcurationsComponent } from "./pages/procurations/procurations.component";
import { routes } from "../routes";

export const getRoutes = () => {
  const childRoutes: Routes = [
    {
      path: "",
      component: DashboardComponent,
      pathMatch: "full",
      redirectTo: partialConfigs.routes.commonRoutes.homeRoute,
    },
    {
      path: partialConfigs.routes.commonRoutes.homeRoute,
      component: DashboardHomeComponent,
    },
    {
      path: routes.clients,
      component: AdhesionMembreComponent
    },
    {
      path: routes.clients,
      component: MemberAddEditComponent
    },
    {
      path: routes.clients,
      component: MemberViewComponent
    },
    {
      path: routes.acquisitions,
      component: ProcurationsComponent
    },
  ];
  return [
    {
      path: "",
      component: DashboardComponent,
      children: childRoutes,
    },
  ] as Routes;
};

@NgModule({
  imports: [RouterModule.forChild(getRoutes())],
})
export class AdminDashboardRoutingModule {}

export const MODULE_DECLARATIONS = [
  DashboardHomeComponent,
  DashboardComponent,

  // Navigation component
  AppNavComponent,

  // Accounts & Settings components
  SettingsComponent,
  UpdatePasswordViewComponent,
];

export const COMPONENTS_PROVIDERS: Provider[] = [
  { provide: LOCALE_ID, useValue: "fr" },
];
