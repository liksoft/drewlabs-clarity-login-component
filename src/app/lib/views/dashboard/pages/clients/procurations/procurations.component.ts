import { Component, OnInit } from "@angular/core";
import { procurationsList } from "./testing/procurations";

@Component({
  selector: "app-procurations",
  templateUrl: "./procurations.component.html",
  styleUrls: ["./procurations.component.scss"],
})
export class ProcurationsComponent {
  public procurationsList = procurationsList;
}
