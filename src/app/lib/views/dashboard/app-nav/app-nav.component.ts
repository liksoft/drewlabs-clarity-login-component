import { Component, OnInit } from "@angular/core";
import { RoutesMap } from "src/app/lib/core/routes";
import { partialConfigs } from "../../partials/partials-configs";

@Component({
  selector: "app-nav",
  template: `
    <app-sidebar
      [routesMap]="routesMap"
      [routeDescriptions]="routeDefinitions"
    ></app-sidebar>
  `,
  styles: [],
})
export class AppNavComponent implements OnInit {
  public routesMap: RoutesMap[];
  public routeDefinitions: { [index: string]: string };

  public ngOnInit(): void {
    this.routeDefinitions = {
      navbar_dashboard: "Tableau de Bord",
      registration_home: "Membres",
      members_add: "Ajouter",
      members_list: "Annuaire",
      procuration_list: "Procurations",
    };
    this.routesMap = [
      {
        key: "navbar_dashboard",
        routeIcon: "home",
        route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.homeRoute}`
        // children: [],
      },
      {
        key: "registration_home",
        routeIcon: "users",
        children: [
          {
            key: "members_list",
            routeIcon: "add-text",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.clientsHomeRoute}`
          },
          {
            key: "members_add",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.clientsAddEditRoute}`
          },
          {
            key: "procuration_list",
            routeIcon: "paste",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.procurationsManageRoute}`,
          },

        ],
      },
    ];
  }
}
