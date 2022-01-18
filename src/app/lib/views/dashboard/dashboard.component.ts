import { Component, OnInit, OnDestroy } from '@angular/core';
import { partialConfigs } from '../partials/partials-configs';
import { UsersProvider } from '../../core/auth/core/providers/app-user';
import { DepartmentsProvider } from '../../core/auth/core/providers/department';
import { RolesProvider } from '../../core/auth/core/providers/role';
import { AuthorizationsProvider } from '../../core/auth/core/providers/authorizations';
import { CompaniesProvider } from '../../core/auth/core/providers/organisation';
import { RoutesMap } from 'src/app/lib/core/routes';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';

const resetProvidersStores = (providers: { destroy(): void; }[]) => {
  providers.forEach(provider => provider.destroy());
};

@Component({
  selector: 'app-admin-dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  public routesMap: RoutesMap[];
  public routeDefinitions: { [index: string]: string };
  public loading: boolean = undefined;

  statefulProviders: { destroy: () => void }[] = [
    this.users,
    this.departments,
    this.roles,
    this.authorizations,
    this.companies
  ];

  constructor(
    uiState: AppUIStateProvider,
    private users: UsersProvider,
    private departments: DepartmentsProvider,
    private roles: RolesProvider,
    private authorizations: AuthorizationsProvider,
    private companies: CompaniesProvider
  ) {
    uiState.endAction();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.routeDefinitions = {
      topbar_dashboard: 'Tableau de bord',
    };
    this.routesMap = [
      {
        key: 'topbar_dashboard',
        route: `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.commonRoutes.homeRoute}`
      }
    ];
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    resetProvidersStores(this.statefulProviders);
  }

}
