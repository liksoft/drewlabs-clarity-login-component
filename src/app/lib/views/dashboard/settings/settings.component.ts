import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  profileActive = true;
  apiActive = false;

  // tslint:disable-next-line: variable-name
  private _showHidePasswordUIController$ = new BehaviorSubject(false);
  showUpdatePasswordUI$ = this._showHidePasswordUIController$.asObservable();

  // tslint:disable-next-line: typedef
  showUpdatePasswordUI() {
    this._showHidePasswordUIController$.next(true);
  }

  // tslint:disable-next-line: typedef
  hideUpdatePasswordUI() {
    this._showHidePasswordUIController$.next(false);
  }

  constructor() {}
}
