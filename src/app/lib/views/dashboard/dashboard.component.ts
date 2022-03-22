import { Component, Inject, OnDestroy } from "@angular/core";
import { partialConfigs } from "../partials/partials-configs";
import { UsersProvider } from "../../core/auth/core/providers/app-user";
import { DepartmentsProvider } from "../../core/auth/core/providers/department";
import { RolesProvider } from "../../core/auth/core/providers/role";
import { AuthorizationsProvider } from "../../core/auth/core/providers/authorizations";
import { CompaniesProvider } from "../../core/auth/core/providers/organisation";
import { RoutesMap } from "../partials/routes";
import { UIStateProvider, UI_STATE_PROVIDER } from "../partials/ui-state";

const resetProvidersStores = (providers: { destroy(): void }[]) => {
  providers.forEach((provider) => provider.destroy());
};

@Component({
  selector: "app-dashboard-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
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

  statefulProviders: { destroy: () => void }[] = [
    this.users,
    this.departments,
    this.roles,
    this.authorizations,
    this.companies,
  ];

  constructor(
    @Inject(UI_STATE_PROVIDER) uiState: UIStateProvider,
    private users: UsersProvider,
    private departments: DepartmentsProvider,
    private roles: RolesProvider,
    private authorizations: AuthorizationsProvider,
    private companies: CompaniesProvider
  ) {
    uiState.endAction();
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    resetProvidersStores(this.statefulProviders);
  }
}
