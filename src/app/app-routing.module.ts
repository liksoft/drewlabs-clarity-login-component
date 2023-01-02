import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AUTH_RESOURCES_AUTHORIZATIONS } from "./lib/views/authorizations";
import { moduleRoutes } from './lib/views/modules/routes';
import { routes as routeDefinitions } from "./lib/views/routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: routeDefinitions.dashboardRoute,
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./lib/views/login/login.module").then((m) => m.LoginModule),
    data: {
      path: routeDefinitions.dashboardRoute,
      authorizations: AUTH_RESOURCES_AUTHORIZATIONS,
      moduleName: "Système de Gestion Intégré",
    },
  },
  // Porvides independant module routing before the dashboard routing
  // for more specific routing when navigating to the dashboard components
  {
    path: moduleRoutes.clients,
    loadChildren: () =>
      import("./lib/views/modules/clients/clients.module").then(
        (m) => m.ClientsModule
      ),
  },
  {
    path: routeDefinitions.dashboardRoute,
    loadChildren: () =>
      import("./lib/views/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
