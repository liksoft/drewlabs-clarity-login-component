import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";
import { SharedModule } from "../../../shared.module";
// import {
//   CustomersService,
//   IndividualMembersService,
//   MembersService,
//   MoralMembersService,
//   StakeHoldersService,
// } from "./clients.service";
import { declarations } from "./routes";

@NgModule({
  imports: [SharedModule, HighchartsChartModule, RouterModule],
  declarations: [...declarations],
  providers: [
    // MembersService,
    // IndividualMembersService,
    // MoralMembersService,
    // StakeHoldersService,
    // CustomersService,
  ],
})
export class ClientsModule {}
