import { NgModule } from '@angular/core';
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS
} from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { PartialsModule } from '../../../partials/partials.module';

@NgModule({
  imports: [
    AdminDashboardRoutingModule,
    PartialsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    ...MODULE_DECLARATIONS
  ],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: []
})
export class DashboardModule {
  constructor() { }
}
