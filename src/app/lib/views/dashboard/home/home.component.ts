import { Component } from "@angular/core";
import { AuthService } from "../../../core/auth/core";
import { RoutesMap } from "src/app/lib/core/routes";

@Component({
  selector: "app-admin-dashboard-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class AdminDashboardHomeComponent {
  public navbarRoutesMap: RoutesMap[];
  constructor(private auth: AuthService) {}
}
