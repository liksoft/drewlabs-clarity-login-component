import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { AuthService } from 'src/app/lib/core/auth/core';
import { TranslationService } from 'src/app/lib/core/translator';
import { UsersProvider } from 'src/app/lib/core/auth/core/providers';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { isDefined } from 'src/app/lib/core/utils';
import { updateUserAction, userUpdatedAction } from 'src/app/lib/core/auth/core/actions';
import { AppUser } from 'src/app/lib/core/auth/contracts/v2/user/user';
import { CustomValidators } from 'src/app/lib/core/validators';
import { UIStateStatusCode } from 'src/app/lib/core/contracts/ui-state';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';

@Component({
  selector: 'app-update-password-view',
  templateUrl: './update-password-view.component.html',
  styles: [
      `
      .required-text,
      .field-has-error {
          color: rgb(241, 50, 50);
      }
      .button-container {
        margin-top: 1rem;
        align-items: flex-start;
        text-align: left;
      }
      .clr-form-control {
        text-align: left;
      }
      /* .clr-control-container {
        width: 50%;
      } */
      `
  ]
})
export class UpdatePasswordViewComponent implements OnInit, OnDestroy {

  public passwordUpdateFormGroup: FormGroup = this.builder.group({
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  @Output() cancelEvent = new EventEmitter<boolean>();
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();
  translations$ = this.translate.translate([
    'invalidRequestParams',
    'serverRequestFailed',
    'passwordUpdate.successfulRequest'
  ]).pipe(
    takeUntil(this._destroy$)
  );
  state$ = combineLatest([
    this.users.state$.pipe(
      tap(state => {
        if (state.performingAction) {
          this.uiState.startAction();
        } else {
          this.uiState.endAction();
        }
      })
    ),
    this.translations$,
    this.auth.state$
  ])
    .pipe(
      map(([state, translations, authState]) => ({
        ...state,
        translations,
        user: authState.user as AppUser
      })),
      tap(state => {

        if (state.updateResult === true) {
          this.uiState.endAction(state.translations['passwordUpdate.successfulRequest'], UIStateStatusCode.STATUS_OK);
          // Makes the createdRole null after the user was notified
          setTimeout(() => {
            userUpdatedAction(this.users.store$)(null);
            this.uiState.endAction();
          }, 2000);
        }
        if (state.error && isDefined(state.error.status)) {
          this.uiState.endAction(
            isDefined(state.error.validationErrors) ?
              null : null,
            state.error.status
          ); //
        }
      }),
      doLog('My account component state: ')
    );

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private translate: TranslationService,
    private users: UsersProvider,
    private uiState: AppUIStateProvider,
    private client: DrewlabsRessourceServerClient) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.passwordUpdateFormGroup.setValidators(CustomValidators.Match('password', 'password_confirmation'));
    this.passwordUpdateFormGroup.updateValueAndValidity();
  }

  // tslint:disable-next-line: typedef
  onFormSubmitted(userID: number | string) {
    this.setPasswordAndPasswordConfirmationErrors(this.passwordUpdateFormGroup, null);
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.passwordUpdateFormGroup
    );
    if (this.passwordUpdateFormGroup.valid) {
      updateUserAction(this.users.store$)(this.client, 'users', userID, this.passwordUpdateFormGroup.getRawValue());
    } else {
      if (this.passwordUpdateFormGroup.hasError('Match')) {
        this.setPasswordAndPasswordConfirmationErrors(this.passwordUpdateFormGroup, { Match: true });
      }
    }
    return;
  }

  // tslint:disable-next-line: typedef
  setPasswordAndPasswordConfirmationErrors(formgroup: FormGroup, error: any) {
    ['password', 'password_confirmation'].forEach((k) => {
      formgroup.get(k).setErrors(error);
    });
  }

  // tslint:disable-next-line: typedef
  onCancelBtnClicked() {
    this.cancelEvent.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    userUpdatedAction(this.users.store$)(null);
  }

}
