import { partialConfigs } from "./partials/partials-configs";
import { RoutesMap } from "./partials/routes";

export const routes = {
  // CLIENTS
  clientsModuleRoute: "clients",
  clientsHomeRoute: "home",
  clientsListRoute: "list",
  clientsDetailsRoute: "details",
  moralClientRoute: "morals",
  individualClientRoute: "individuals",
  clientsViewRoute: "view",
  procurationsManageRoute: "procurations",

  // ACCOUNTS
  accountHomeRoute: "account_home",
  accountListRoute: "account_list",

  // CAISSE
  cashierHomeRoute: "cashier_home",
  cashierListRoute: "cashier_list",
  cashierAddRoute: "cashier_add",
  cashierOperationAddRoute: "cashier_operation_add",

  // CREDITS
  creditsHomeRoute: "credits_home",
  creditsListRoute: "credits_list",
  creditAddRoute: "credit_add ",

  // BANQUES
  bankHomeRoute: "bank_home",
  bankListRoute: "bank_list",
  bankAddRoute: "bank_add",

  // DAT
  datHomeRoute: "dat_home",
  datListRoute: "dat_list",
  datAddRoute: "dat_add",

  // Common
  dashboardRoute: "dashboard",
  dashboardHome: "home",
};

// Routes Mapping
export const defaults = {
  map: [
    {
      key: "topbar_dashboard",
      route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.homeRoute}`,
    },
  ] as RoutesMap[],
  definitions: {
    topbar_dashboard: "Tableau de bord",
  },
};
