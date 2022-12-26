import { Component } from "@angular/core";
import { chartOptions, highcharts, secondOptions } from "../testing/charts";

@Component({
  selector: "app-clients",
  templateUrl: "./clients-home.component.html",
})
export class ClientsHomeComponent {
  constructor() {}

  highcharts = highcharts;
  // line chart
  chartOptions: Highcharts.Options = chartOptions;
  // Pie Chart
  secondOptions: Highcharts.Options = secondOptions;
}
