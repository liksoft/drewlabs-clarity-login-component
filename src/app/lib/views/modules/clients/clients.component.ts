import { Component, Input } from "@angular/core";
import { defaults } from "../../routes";

@Component({
  selector: "liksmi-app-clients",
  templateUrl: "./clients.component.html",
})
export class ClientsComponent {
  @Input() defaultRoutes = defaults;
}
