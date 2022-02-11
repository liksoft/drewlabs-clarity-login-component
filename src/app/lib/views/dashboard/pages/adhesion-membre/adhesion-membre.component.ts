import { Component } from "@angular/core";
import { individuals, morals } from "./testing/members";

@Component({
  selector: "app-adhesion-membre",
  templateUrl: "./adhesion-membre.component.html",
  styleUrls: ["./adhesion-membre.component.scss"],
})
export class AdhesionMembreComponent {
  public individuals = individuals;
  public morals = morals;
}
