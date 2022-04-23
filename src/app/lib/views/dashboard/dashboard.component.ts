import { Component, Inject, OnDestroy } from "@angular/core";
import { partialConfigs } from "../partials/partials-configs";
import { RoutesMap } from "../partials/routes";
import { UIStateProvider, UI_STATE_PROVIDER } from "../partials/ui-state";
@Component({
  selector: "app-dashboard-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [
    `
      .container {
        margin: 16px;
      }
    `,
  ],
})
export class DashboardComponent implements OnDestroy {
  // Routes Mapping
  public routesMap: RoutesMap[] = [
    {
      key: "topbar_dashboard",
      route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.homeRoute}`,
    },
  ];
  // Routes definitions
  public routeDefinitions = {
    topbar_dashboard: "Tableau de bord",
  };
  //
  public loading: boolean = false;

  constructor(@Inject(UI_STATE_PROVIDER) uiState: UIStateProvider) {
    uiState.endAction();
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {}

  onAcceptFilesChange(event: File | File[]) {
    console.log(event);
  }
}
