import { Component } from '@angular/core';
import { defaultPath } from 'src/app/lib/views/partials/partials-configs';
import { Router } from '@angular/router';
import { RoleV2 } from '../../../../core/auth/contracts/v2/authorizations/role';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
    `
    .app-content-container {
      padding: 0 16px;
    }
    `
  ]
})
export class RolesComponent {

  public createRoleRoute = `/${defaultPath}/${environment?.appRoutes.managementsRoute}/${environment?.appRoutes.createRole}`;
  public dashboardHomeRoute = `/${defaultPath}`;

  state$ = this.uiState.uiState.pipe(
    map(state => ({ performingAction: state.performingAction }))
  );

  constructor(private router: Router, private uiState: AppUIStateProvider) { }

  onRoleSelected = (role: RoleV2) => {
    this.router.navigate([`/${defaultPath}/${environment?.appRoutes.managementsRoute}/${environment?.appRoutes.updatedRoleRoute}`, role.id]);
  }

  onCreateAuthorizationGroup() {
    this.router.navigateByUrl(`/${defaultPath}/${environment?.appRoutes.managementsRoute}/${environment?.appRoutes.createRole}`);
  }

}
