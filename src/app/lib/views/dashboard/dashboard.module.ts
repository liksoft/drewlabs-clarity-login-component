import { NgModule } from "@angular/core";
import { HighchartsChartModule } from "highcharts-angular";
import { SharedModule } from "../shared.module";
import {
  AdminDashboardRoutingModule,
  COMPONENTS_PROVIDERS,
  MODULE_DECLARATIONS,
} from "./dashboard-routing.module";

@NgModule({
  imports: [AdminDashboardRoutingModule, SharedModule, HighchartsChartModule],
  declarations: [...MODULE_DECLARATIONS],
  exports: [...MODULE_DECLARATIONS],
  providers: [...COMPONENTS_PROVIDERS],
  entryComponents: [],
})
export class DashboardModule {}
