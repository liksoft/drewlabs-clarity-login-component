import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AUTH_RESOURCES_AUTHORIZATIONS } from './lib/views/authorizations';
import { routes as routeDefinitions } from './lib/views/routes';


const routes: Routes = [
  {
    path: '',
    redirectTo: routeDefinitions.dashboardRoute,
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./lib/views/login/login.module').then(m => m.LoginModule),
    data: {
      path: routeDefinitions.dashboardRoute,
      authorizations: AUTH_RESOURCES_AUTHORIZATIONS,
      moduleName: 'Système de Gestion Intégré'
    }
  },
  {
    path: routeDefinitions.dashboardRoute,
    loadChildren: () => import('./lib/views/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
