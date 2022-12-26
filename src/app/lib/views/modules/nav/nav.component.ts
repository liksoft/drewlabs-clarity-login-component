import { Component, Input } from "@angular/core";
import { RoutesMap } from "../../partials/routes";
import { routes } from "../../routes";

@Component({
  selector: "app-nav",
  template: `
    <ng-container *ngIf="!!routesmap && !!definitions">
      <app-sidebar
        [routesMap]="routesmap"
        [routeDescriptions]="definitions"
      ></app-sidebar>
    </ng-container>
  `,
})
export class NavComponent {
  @Input() routesmap: RoutesMap[] = [
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
          route: `/${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.clientsHomeRoute}`,
        },
        {
          key: "members_list",
          routeIcon: "add-text",
          route: `/${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.clientsListRoute}`,
        },
        {
          key: "procuration_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.procurationsManageRoute}`,
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
          route: `/${routes.dashboardRoute}/${routes.accountHomeRoute}`,
        },
        {
          key: "account_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.accountListRoute}`,
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
          route: `/${routes.dashboardRoute}/${routes.creditsHomeRoute}`,
        },
        {
          key: "credit_add",
          routeIcon: "add-text",
          route: `/${routes.dashboardRoute}/${routes.creditAddRoute}`,
        },
        {
          key: "credits_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.creditsListRoute}`,
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
          route: `/${routes.dashboardRoute}/${routes.cashierHomeRoute}`,
        },
        {
          key: "cashier_add",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.cashierAddRoute}`,
        },
        {
          key: "cashier_operation_add",
          routeIcon: "add-text",
          route: `/${routes.dashboardRoute}/${routes.cashierOperationAddRoute}`,
        },
        {
          key: "cashier_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.cashierListRoute}`,
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
          route: `/${routes.dashboardRoute}/${routes.datHomeRoute}`,
        },
        {
          key: "dat_add",
          routeIcon: "plus-circle",
          route: `/${routes.dashboardRoute}/${routes.datAddRoute}`,
        },
        {
          key: "dat_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.datListRoute}`,
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
          route: `/${routes.dashboardRoute}/${routes.bankHomeRoute}`,
        },
        {
          key: "bank_add",
          routeIcon: "plus-circle",
          route: `/${routes.dashboardRoute}/${routes.bankAddRoute}`,
        },
        {
          key: "bank_list",
          routeIcon: "list",
          route: `/${routes.dashboardRoute}/${routes.bankListRoute}`,
        },
      ],
    },
  ];
  @Input() definitions: Record<string, string> = {
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
}
