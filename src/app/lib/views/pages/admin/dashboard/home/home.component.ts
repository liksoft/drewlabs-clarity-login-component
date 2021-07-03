import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/auth/core';
import { defaultPath } from '../../../../partials/partials-configs';
import { RoutesMap } from 'src/app/lib/core/routes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './home.component.html',
  styles: []
})
export class AdminDashboardHomeComponent {
  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: { [index: string]: string };
  public listUserRoutePath: string;
  public manageRolesPath: string;
  public manageFormsPath: string;
  public manageModulesPath: string;
  public manageDepartmentsPath: string;
  public manageGeneralConfigPath: string;

  constructor(private auth: AuthService) {
    const appRoutes = environment.appRoutes;
    this.listUserRoutePath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.listUsersRoute}`;
    this.manageRolesPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.rolesManagementRoute}`;
    this.manageFormsPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.formsManagementRoute}`;
    this.manageModulesPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.modulesManagementRoute}`;
    this.manageDepartmentsPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.departmentManagementRoute}`;
    this.manageGeneralConfigPath = `/${defaultPath}/${appRoutes.globalConfigurationsRoute}`;
  }
}
