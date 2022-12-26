import { LOCALE_ID, NgModule, Provider } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { routes } from "../routes";
import { DashboardComponent } from "./dashboard.component";
import { AccountListComponent } from "./pages/accounts/account-list/account-list.component";
import { AccountsComponent } from "./pages/accounts/accounts.component";
import { BanksAddComponent } from "./pages/banks/banks-add/banks-add.component";
import { BanksListComponent } from "./pages/banks/banks-list/banks-list.component";
import { BanksOperationAddComponent } from "./pages/banks/banks-operation-add/banks-operation-add.component";
import { BanksComponent } from "./pages/banks/banks.component";
import { CaisseOperationsComponent } from "./pages/caisses/caisse-operations/caisse-operations.component";
import { CaissesAddComponent } from "./pages/caisses/caisses-add/caisses-add.component";
import { CaissesListComponent } from "./pages/caisses/caisses-list/caisses-list.component";
import { CaissesComponent } from "./pages/caisses/caisses.component";
import { CreditsAddComponent } from "./pages/credits/credits-add/credits-add.component";
import { CreditsListComponent } from "./pages/credits/credits-list/credits-list.component";
import { CreditsComponent } from "./pages/credits/credits.component";
import { DatAddComponent } from "./pages/dat/dat-add/dat-add.component";
import { DatListComponent } from "./pages/dat/dat-list/dat-list.component";
import { DatComponent } from "./pages/dat/dat.component";
import { DashboardHomeComponent } from "./pages/home/home.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdatePasswordViewComponent } from "./settings/update-password-view/update-password-view.component";

export const getRoutes = () => {
  const childRoutes: Routes = [
    {
      path: "",
      component: DashboardComponent,
      pathMatch: "full",
      redirectTo: routes.dashboardHome,
    },
    {
      path: routes.dashboardHome,
      component: DashboardHomeComponent,
    },
    // ACCOUNTS
    {
      path: routes.accountHomeRoute,
      component: AccountsComponent,
    },
    {
      path: routes.accountListRoute,
      component: AccountListComponent,
    },
    // CREDITS
    {
      path: routes.creditsHomeRoute,
      component: CreditsComponent,
    },
    {
      path: routes.creditsListRoute,
      component: CreditsListComponent,
    },
    {
      path: routes.creditAddRoute,
      component: CreditsAddComponent,
    },
    // BANQUES
    {
      path: routes.bankHomeRoute,
      component: BanksComponent,
    },
    {
      path: routes.bankListRoute,
      component: BanksListComponent,
    },
    {
      path: routes.bankAddRoute,
      component: BanksAddComponent,
    },
    // CAISSES
    {
      path: routes.cashierHomeRoute,
      component: CaissesComponent,
    },
    {
      path: routes.cashierAddRoute,
      component: CaissesAddComponent,
    },
    {
      path: routes.cashierOperationAddRoute,
      component: CaisseOperationsComponent,
    },
    {
      path: routes.cashierListRoute,
      component: CaissesListComponent,
    },
    // DAT
    {
      path: routes.datHomeRoute,
      component: DatComponent,
    },
    {
      path: routes.datAddRoute,
      component: DatAddComponent,
    },
    {
      path: routes.datListRoute,
      component: DatListComponent,
    },
  ];
  return [
    {
      path: "",
      component: DashboardComponent,
      children: childRoutes,
    },
  ] as Routes;
};

@NgModule({
  imports: [RouterModule.forChild(getRoutes())],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}

export const MODULE_DECLARATIONS = [
  DashboardHomeComponent,
  DashboardComponent,
  // Accounts & Settings components
  SettingsComponent,
  UpdatePasswordViewComponent,
  // App Components
  AccountsComponent,
  AccountListComponent,
  CreditsComponent,
  CreditsListComponent,
  CreditsAddComponent,
  CaissesComponent,
  CaissesListComponent,
  CaissesAddComponent,
  CaisseOperationsComponent,
  BanksComponent,
  BanksListComponent,
  BanksOperationAddComponent,
  BanksAddComponent,
  DatComponent,
  DatListComponent,
  DatAddComponent,
];

export const COMPONENTS_PROVIDERS: Provider[] = [
  { provide: LOCALE_ID, useValue: "fr" },
];
