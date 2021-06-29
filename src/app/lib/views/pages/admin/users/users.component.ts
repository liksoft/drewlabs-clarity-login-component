import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { defaultPath } from '../../../partials/partials-configs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent {

  public createUserRoutePath: string;
  public listUserRoutePath: string;
  public manageRolesPath: string;
  public manageFormsPath: string;
  public manageModulesPath: string;

  constructor() {
    const appRoutes = environment?.appRoutes;
    this.createUserRoutePath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.createUsersRoute}`;
    this.listUserRoutePath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.listUsersRoute}`;
    this.manageRolesPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.rolesManagementRoute}`;
    this.manageFormsPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.formsManagementRoute}`;
    this.manageModulesPath = `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.modulesManagementRoute}`;
  }
}
