import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxClrSmartGridModule } from "@azlabsjs/ngx-clr-smart-grid";
import { DatagridComponent } from "./datagrid.component";
import { GridDataQueryProvider } from "./datagrid.query.service";

@NgModule({
  declarations: [DatagridComponent],
  imports: [CommonModule, NgxClrSmartGridModule],
  exports: [DatagridComponent],
  providers: [GridDataQueryProvider],
})
export class DatagridModule {}
