import { Component, OnInit } from "@angular/core";
import { chartOptions, highcharts, secondOptions } from "./testing/charts";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent {
  constructor() {}

  highcharts = highcharts;
  // line chart
  chartOptions: Highcharts.Options = chartOptions;
  // Pie Chart
  secondOptions: Highcharts.Options = secondOptions;
}
