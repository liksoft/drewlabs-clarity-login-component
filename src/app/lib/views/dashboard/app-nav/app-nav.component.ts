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
      members_menu: "Membres",
      members_add: "Ajouter",
      members_list: "Annuaire",
      procuration_list: "Procurations",
      account_menu: "Comptes",
      cashier_menu: "Caisse",
      cashier_home: "Gestion Caisses",
      cashier_new_operation: "Nouvelle opération",
      credits_home: "Crédits",
      dat_home: "Dépôts à terme",
      bank_home: "Banque",
    };
    this.routesMap = [
      {
        key: "navbar_dashboard",
        routeIcon: "home",
        route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.homeRoute}`
        // children: [],
      },
     
      {
        key: "members_menu",
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
      {
        key: "account_menu",
        routeIcon: "wallet",
        route: ``
        // children: [],
      },
      {
        key: "credits_home",
        routeIcon: "sync",
        route: ``
        // children: [],
      },
      {
        key: "cashier_menu",
        routeIcon: "store",
        route: ``,
        children: [
          {
            key: "cashier_home",
            routeIcon: "plus-circle",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.clientsHomeRoute}`
          },
          {
            key: "cashier_new_operation",
            routeIcon: "plus-circle",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.clientsHomeRoute}`
          },
        ],
      },
      {
        key: "dat_home",
        routeIcon: "volume",
        route: ``
        // children: [],
      },
      {
        key: "bank_home",
        routeIcon: "bank",
        route: ``
        // children: [],
      },
    ];
  }
}
