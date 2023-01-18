import { Component, Inject, Input } from "@angular/core";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { useQuery } from "@azlabsjs/ngx-query";
import { getHttpHost, isValidHttpUrl } from "@azlabsjs/requests";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { chartOptions, highcharts } from "../testing/charts";
import { ZonesReportQueryProvider } from "./zones-reports.query.provider";

@Component({
  selector: "app-clients",
  templateUrl: "./clients-home.component.html",
  providers: [ZonesReportQueryProvider],
})
export class ClientsHomeComponent {
  highcharts = highcharts;
  // line chart
  chartOptions: Highcharts.Options = chartOptions;

  @Input("zones-path") zonesPath!: string;
  @Input("members-path") membersPath!: string;

  private zonesURL: string = !isValidHttpUrl(this.zonesPath ?? "")
    ? `${getHttpHost(
        this.config.get(
          "api.configurations.host",
          environment.api.configurations.host
        )
      )}/${this.config.get(
        "api.configurations.endpoints.zones",
        environment.api.configurations.endpoints.zones
      )}`
    : this.zonesPath;
  membersURL: string = !isValidHttpUrl(this.membersPath ?? "")
    ? `${getHttpHost(
        this.config.get("api.clients.host", environment.api.clients.host)
      )}/${this.config.get(
        "api.clients.endpoints.members",
        environment.api.clients.endpoints.members
      )}`
    : this.membersPath;

  pieChartState$ = (
    useQuery(this.zonesReport, this.zonesURL, this.membersURL) as Observable<
      {
        total: number;
        label: string;
      }[]
    >
  ).pipe(
    map((state) => ({
      chart: {
        plotBackgroundColor: "white",
        plotBorderWidth: 0,
        plotShadow: false,
        type: "pie",
      },
      title: {
        // TODO: Use translation library for the text
        text: "Rêpartition des membres par localité",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "Membres",
          colorByPoint: true,
          data: state.map((item) => ({ y: item.total, name: item.label })),
        },
      ],
    }))
  ) as Observable<Highcharts.Options>;

  constructor(
    private zonesReport: ZonesReportQueryProvider,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}
}
