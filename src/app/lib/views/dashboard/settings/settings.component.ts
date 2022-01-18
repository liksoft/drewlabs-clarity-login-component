import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppUser } from 'src/app/lib/core/auth/contracts/v2';
import { AuthService } from 'src/app/lib/core/auth/core';
import { createStateful } from 'src/app/lib/core/rxjs/helpers';
import { doLog } from 'src/app/lib/core/rxjs/operators';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  profileActive = true;
  apiActive = false;

  // tslint:disable-next-line: variable-name
  private _showHidePasswordUIController$ = createStateful(false);
  showUpdatePasswordUI$  = this._showHidePasswordUIController$.asObservable();

  state$ = combineLatest([
    this.auth.state$,
    this.showUpdatePasswordUI$
  ]).pipe(
    map(([authState, showUpdatePWordView]) => ({
      user: authState.user as IAppUser,
      showUpdatePWordView
    })),
    doLog('Setting component state: ')
  );

  // tslint:disable-next-line: typedef
  showUpdatePasswordUI() {
    this._showHidePasswordUIController$.next(true);
  }

  // tslint:disable-next-line: typedef
  hideUpdatePasswordUI() {
    this._showHidePasswordUIController$.next(false);
  }

  constructor(private auth: AuthService) { }

}
