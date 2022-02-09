import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AUTH_RESOURCES_AUTHORIZATIONS } from './lib/views/authorizations';
import { partialConfigs } from './lib/views/partials/partials-configs';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./lib/views/login/login.module').then(m => m.LoginModule),
    data: {
      path: partialConfigs.routes.commonRoutes.dashboardHomeRoute,
      authorizations: AUTH_RESOURCES_AUTHORIZATIONS,
      moduleName: 'Gestion Clientèle'
    }
  },
  {
    path: partialConfigs.routes.commonRoutes.dashboardRoute,
    loadChildren: () => import('./lib/views/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
