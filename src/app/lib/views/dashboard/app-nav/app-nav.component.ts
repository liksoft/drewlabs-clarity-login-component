import { Component, OnInit } from "@angular/core";
import { RoutesMap } from "../../partials/routes";
import { partialConfigs } from "../../partials/partials-configs";
import { routes } from "../../routes";

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
  public routesMap!: RoutesMap[];
  public routeDefinitions!: { [index: string]: string };

  public ngOnInit(): void {
    this.routeDefinitions = {
      navbar_dashboard: "Tableau de Bord",
      // CLIENTS
      clients_menu: "Clients",
      clients_home: "Aperçu Clients",
      clients_list: "Clients",
      members_list: "Annuaire",
      procuration_list: "Procurations",
      // COMPTES
      account_menu: "Comptes",
      account_home: "Aperçu des comptes",
      account_list: "Liste des comptes",
      // CAISSE
      cashier_menu: "Caisse",
      cashier_home: "Aperçu de la Caisse",
      cashier_list: "Liste des Caisses",
      cashier_operation_add: "Enregistrer opération",
      cashier_add: "Créer caisse",
      // CREDITS
      credits_menu: "Crédits",
      credits_home: "Aperçu des Crédits",
      credits_list: "Liste des crédits",
      credit_add: "Enregistrer un crédit",
      // BANQUES
      bank_menu: "Banques",
      bank_home: "Aperçu des banques",
      bank_list: "Liste des Banques",
      bank_add: "Enregistrer une banque",
      // DAT
      dat_menu: "Dépôts à terme",
      dat_home: "Aperçu des DAT",
      dat_list: "Liste des DAT",
      dat_add: "Enregister un DAT",
    };
    this.routesMap = [
      {
        key: "navbar_dashboard",
        routeIcon: "home",
        route: `/${routes.dashboardRoute}/${routes.dashboardHome}`,
        // children: [],
      },

      {
        key: "clients_menu",
        routeIcon: "users",
        children: [
          {
            key: "clients_home",
            routeIcon: "tools",
            route: `${routes.clientsModuleRoute}/${routes.clientsHomeRoute}`,
          },
          {
            key: "members_list",
            routeIcon: "add-text",
            route: `${routes.clientsModuleRoute}/${routes.clientsListRoute}`,
          },
          {
            key: "procuration_list",
            routeIcon: "list",
            route: `${routes.clientsModuleRoute}/${routes.procurationsManageRoute}`,
          },
        ],
      },
      {
        key: "account_menu",
        routeIcon: "wallet",
        route: ``,
        children: [
          {
            key: "account_home",
            routeIcon: "tools",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.accountHomeRoute}`,
          },
          {
            key: "account_list",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.accountListRoute}`,
          },
        ],
      },
      {
        key: "credits_menu",
        routeIcon: "sync",
        route: ``,
        children: [
          {
            key: "credits_home",
            routeIcon: "tools",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.creditsHomeRoute}`,
          },
          {
            key: "credit_add",
            routeIcon: "add-text",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.creditAddRoute}`,
          },
          {
            key: "credits_list",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.creditsListRoute}`,
          },
        ],
      },
      {
        key: "cashier_menu",
        routeIcon: "store",
        route: ``,
        children: [
          {
            key: "cashier_home",
            routeIcon: "plus-circle",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.cashierHomeRoute}`,
          },
          {
            key: "cashier_add",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.cashierAddRoute}`,
          },
          {
            key: "cashier_operation_add",
            routeIcon: "add-text",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.cashierOperationAddRoute}`,
          },
          {
            key: "cashier_list",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.cashierListRoute}`,
          },
        ],
      },
      {
        key: "dat_menu",
        routeIcon: "volume",
        route: ``,
        children: [
          {
            key: "dat_home",
            routeIcon: "tools",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.datHomeRoute}`,
          },
          {
            key: "dat_add",
            routeIcon: "plus-circle",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.datAddRoute}`,
          },
          {
            key: "dat_list",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.datListRoute}`,
          },
        ],
      },
      {
        key: "bank_menu",
        routeIcon: "bank",
        route: ``,
        children: [
          {
            key: "bank_home",
            routeIcon: "tools",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.bankHomeRoute}`,
          },
          {
            key: "bank_add",
            routeIcon: "plus-circle",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.bankAddRoute}`,
          },
          {
            key: "bank_list",
            routeIcon: "list",
            route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${routes.bankListRoute}`,
          },
        ],
      },
    ];
  }
}
