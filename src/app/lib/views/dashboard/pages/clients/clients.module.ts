import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";
import { SharedModule } from "../../../shared.module";
import { declarations } from "./routes";
import { IndividualMemberAddComponent } from './individual-member-add/individual-member-add.component';
import { MoralMemberAddComponent } from './moral-member-add/moral-member-add.component';

@NgModule({
  imports: [SharedModule, HighchartsChartModule, RouterModule],
  declarations: [...declarations, IndividualMemberAddComponent, MoralMemberAddComponent],
})
export class ClientsModule {}
