import { NgModule } from "@angular/core";
import {
  MODULE_DECLARATIONS,
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS,
} from "./dashboard-routing.module";
import { SharedModule } from "../shared.module";
import { HighchartsChartModule } from "highcharts-angular";
import { ClientsModule } from "./pages/clients/clients.module";

@NgModule({
  imports: [
    AdminDashboardRoutingModule,
    SharedModule,
    HighchartsChartModule,
    ClientsModule,
  ],
  declarations: [...MODULE_DECLARATIONS],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: [],
})
export class DashboardModule {
  constructor() {}
}
