import { Component, Input } from "@angular/core";
import { defaults } from "../routes";
@Component({
  selector: "app-dashboard-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  @Input() defaultRoutes = defaults;
}
