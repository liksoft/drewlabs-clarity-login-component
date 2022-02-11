import { CreditsComponent } from './pages/credits/credits.component';
import { AccountListComponent } from './pages/accounts/account-list/account-list.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { NgModule, LOCALE_ID, Provider } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./dashboard.component";
import { AuthGuardService } from "src/app/lib/core/auth/core";
import { AdminDashboardHomeComponent } from "./home/home.component";
import { partialConfigs } from "../partials/partials-configs";
import { AppNavComponent } from "./app-nav/app-nav.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdatePasswordViewComponent } from "./settings/update-password-view/update-password-view.component";
import { AuthorizationsGuard } from "../../core/auth/core/auth-guard.service";
import { AUTH_RESOURCES_AUTHORIZATIONS } from "../authorizations";
import { MemberAddEditComponent } from './pages/clients/adhesion-membre/member-add-edit/member-add-edit.component';
import { ProcurationsComponent } from './pages/clients/procurations/procurations.component';
import { MemberViewComponent } from './pages/clients/adhesion-membre/member-view/member-view.component';
import { AdhesionMembreComponent } from './pages/clients/adhesion-membre/adhesion-membre.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ClientsComponent } from './pages/clients/clients.component';
import { CreditsListComponent } from './pages/credits/credits-list/credits-list.component';
import { CreditsAddComponent } from './pages/credits/credits-add/credits-add.component';
import { CaissesComponent } from './pages/caisses/caisses.component';
import { CaissesListComponent } from './pages/caisses/caisses-list/caisses-list.component';
import { CaissesAddComponent } from './pages/caisses/caisses-add/caisses-add.component';
import { BanksComponent } from './pages/banks/banks.component';
import { BanksListComponent } from './pages/banks/banks-list/banks-list.component';
import { BanksOperationAddComponent } from './pages/banks/banks-operation-add/banks-operation-add.component';
import { BanksAddComponent } from './pages/banks/banks-add/banks-add.component';
import { DatComponent } from './pages/dat/dat.component';
import { DatListComponent } from './pages/dat/dat-list/dat-list.component';
import { DatAddComponent } from './pages/dat/dat-add/dat-add.component';
import { CaisseOperationsComponent } from './pages/caisses/caisse-operations/caisse-operations.component';

export const getRoutes = () => {
  const adminAuthorizations = AUTH_RESOURCES_AUTHORIZATIONS;

  const childRoutes: Routes = [
    {
      path: "",
      component: AdminDashboardComponent,
      pathMatch: "full",
      redirectTo: partialConfigs.routes.commonRoutes.homeRoute,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.homeRoute,
      component: AdminDashboardHomeComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsHomeRoute,
      component: ClientsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsListRoute,
      component: AdhesionMembreComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsAddEditRoute,
      component: MemberAddEditComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.clientsViewRoute,
      component: MemberViewComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.procurationsManageRoute,
      component: ProcurationsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    // ACCOUNTS
    {
      path: partialConfigs.routes.commonRoutes.accountHomeRoute,
      component: AccountsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.accountListRoute,
      component: AccountListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    // CREDITS
    {
      path: partialConfigs.routes.commonRoutes.creditsHomeRoute,
      component: CreditsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.creditsListRoute,
      component: CreditsListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.creditAddRoute,
      component: CreditsAddComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    // BANQUES
    {
      path: partialConfigs.routes.commonRoutes.bankHomeRoute,
      component: BanksComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.bankListRoute,
      component: BanksListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.bankAddRoute,
      component: BanksAddComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    // CAISSES
    {
      path: partialConfigs.routes.commonRoutes.cashierHomeRoute,
      component: CaissesComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.cashierAddRoute,
      component: CaissesAddComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.cashierOperationAddRoute,
      component: CaisseOperationsComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.cashierListRoute,
      component: CaissesListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    // DAT
    {
      path: partialConfigs.routes.commonRoutes.datHomeRoute,
      component: DatComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.datAddRoute,
      component: DatAddComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
    {
      path: partialConfigs.routes.commonRoutes.datListRoute,
      component: DatListComponent,
      canActivate: [AuthGuardService, AuthorizationsGuard],
      data: {
        authorizations: adminAuthorizations,
      },
    },
  ];
  return [
    {
      path: "",
      component: AdminDashboardComponent,
      canLoad: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      canActivate: [AuthGuardService],
      children: childRoutes,
    },
  ] as Routes;
};

@NgModule({
  imports: [RouterModule.forChild(getRoutes())],
})
export class AdminDashboardRoutingModule {}

export const MODULE_DECLARATIONS = [
  AdminDashboardHomeComponent,
  AdminDashboardComponent,
  // Navigation component
  AppNavComponent,
  // Accounts & Settings components
  SettingsComponent,
  UpdatePasswordViewComponent,
  // App Components
  AdhesionMembreComponent,
  ProcurationsComponent,
  MemberViewComponent,
  MemberAddEditComponent,
  ClientsComponent,
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
