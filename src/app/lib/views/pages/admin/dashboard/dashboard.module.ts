import { NgModule } from '@angular/core';
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS
} from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { PartialsModule } from '../../../partials/partials.module';
import { FormComponentService } from '../forms/form-component.service';

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
  providers: [...COMPONENTS_PROVIDERS, FormComponentService],
  entryComponents: []
})
export class DashboardModule {
  constructor() { }
}
