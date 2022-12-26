import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidebarModule } from "../../partials/sidebar";
import { NavComponent } from "./nav.component";

@NgModule({
  imports: [CommonModule, SidebarModule],
  declarations: [NavComponent],
  exports: [NavComponent],
})
export class NavModule {}
