import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";
import { SharedModule } from "../../../shared.module";
import { declarations } from "./routes";

@NgModule({
  imports: [SharedModule, HighchartsChartModule, RouterModule],
  declarations: [...declarations],
})
export class ClientsModule {}
