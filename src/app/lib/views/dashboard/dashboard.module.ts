import { NgModule } from '@angular/core';
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS
} from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { AdhesionMembreComponent } from './pages/adhesion-membre/adhesion-membre.component';
import { ProcurationsComponent } from './pages/procurations/procurations.component';
import { MemberViewComponent } from './pages/adhesion-membre/member-view/member-view.component';
import { MemberAddEditComponent } from './pages/adhesion-membre/member-add-edit/member-add-edit.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    RouterModule,
    HighchartsChartModule
  ],
  declarations: [
    ...MODULE_DECLARATIONS,
    AdhesionMembreComponent,
    ProcurationsComponent,
    MemberViewComponent,
    MemberAddEditComponent
  ],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: []
})
export class DashboardModule {
  constructor() { }
}
