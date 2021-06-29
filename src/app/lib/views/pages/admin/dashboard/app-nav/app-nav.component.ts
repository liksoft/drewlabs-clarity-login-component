import { Component, OnInit } from '@angular/core';
import { RoutesMap } from 'src/app/lib/core/routes';
import { defaultPath } from 'src/app/lib/views/partials/partials-configs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  template: `
    <app-sidebar [routesMap]="navbarRoutesMap" [routeDescriptions]="navbarRouteDefinitions"></app-sidebar>
  `,
  styles: []
})
export class AppNavComponent implements OnInit {

  public navbarRoutesMap: RoutesMap[];
  public navbarRouteDefinitions: { [index: string]: string };

  public ngOnInit(): void {
    const appRoutes = environment?.appRoutes;
  
    this.navbarRouteDefinitions = {
      navbar_user_groups_header: 'Utilisateurs & groupes',
      navbar_forms_managenents_header: 'Formulaires',
      navbar_modules_management_header: 'Gestion des modules',
      navbar_users_management_create: 'Ajouter un utilisateur',
      navbar_users_management_list: 'Gestion des utilisateurs',
      navbar_roles_authorizations: 'Roles & Authorizations',
      navbar_forms_create: 'Créer un formulaire',
      navbar_forms_list: 'Gestion des formulaires',
      navbar_form_control_options: 'Gestion des options de champs',
      navbar_modules_list: 'Gestion des modules',
      navbar_modules_create: 'Ajouter un nouveau module', //
      navbar_department_management_header: 'Gestion des départements',
      navbar_department_list: 'Gestion des départements',
      navbar_account: 'Mon compte',
      navbar_personal_information: 'Informations personnelles',
      navbar_cofigs: 'Configurations',
      navbar_global_config: 'Configurations globales',
      navbar_rtiei_configs: 'Retraite par capitalisation',
      navbar_rc_configs: 'Retraite complémentaire'
    };
    this.navbarRoutesMap = [
      {
        key: 'navbar_user_groups_header',
        routeIcon: 'users',
        children: [
          {
            key: 'navbar_users_management_list',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.listUsersRoute}`
          },
          {
            key: 'navbar_roles_authorizations',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.rolesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_forms_managenents_header',
        routeIcon: 'form',
        children: [
          {
            key: 'navbar_forms_list',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.formsManagementRoute}`
          },
          {
            key: 'navbar_form_control_options',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.controlOptionsRoute}`
          }
        ]
      },
      {
        key: 'navbar_modules_management_header',
        routeIcon: 'blocks-group',
        children: [
          {
            key: 'navbar_modules_list',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.modulesManagementRoute}`
          }
        ]
      },
      {
        key: 'navbar_department_management_header',
        routeIcon: 'employee-group',
        children: [
          {
            key: 'navbar_department_list',
            route: `/${defaultPath}/${appRoutes.managementsRoute}/${appRoutes.departmentManagementRoute}`
          }
        ]
      },
      // Configurations
      {
        key: 'navbar_cofigs',
        routeIcon: 'cog',
        children: [
          {
            key: 'navbar_global_config',
            route: `/${defaultPath}/${appRoutes.globalConfigurationsRoute}`
          }
        ]
      },
      {
        key: 'navbar_account',
        routeIcon: 'info-standard',
        children: [
          {
            key: 'navbar_personal_information',
            route: `/${defaultPath}/${appRoutes.accountRoute}`
          },
        ]
      }
    ].filter(route => {
      if (
        (!environment.isDepartmentWorkspaceEnabled && (route.key === 'navbar_department_management_header')) ||
        (!environment.isFormsWorkspaceEnabled && (route.key === 'navbar_forms_managenents_header')) ||
        (!environment.isModulesWorkspaceEnabled && (route.key === 'navbar_modules_management_header')) ||
        (!environment.isConfigurationWorkspaceEnabled && (route.key === 'navbar_cofigs'))
      ) {
        return false;
      }
      return true;
      //  ''
    });
  }
}
