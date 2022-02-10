import { NgModule } from '@angular/core';
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS
} from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    RouterModule,
    HighchartsChartModule,
  ],
  declarations: [
    ...MODULE_DECLARATIONS,

  ],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: []
})
export class DashboardModule {
  constructor() { }
}
