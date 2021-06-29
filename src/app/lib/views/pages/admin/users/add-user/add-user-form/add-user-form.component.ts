import { Component, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, Inject } from '@angular/core';
import { IDynamicForm } from '../../../../../../core/components/dynamic-inputs/core/contracts/dynamic-form';
import { FormGroup, Validators } from '@angular/forms';
import { createUserAction, updateUserAction } from 'src/app/lib/core/auth/core/actions';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { DepartmentsProvider } from 'src/app/lib/core/auth/core/providers/department';
import { UsersProvider } from 'src/app/lib/core/auth/core/providers/app-user';
import { getJSObjectPropertyValue, isDefined, MomentUtils } from 'src/app/lib/core/utils';
import { IHTMLFormControl, ISelectItem } from 'src/app/lib/core/components/dynamic-inputs/core';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { createSubject, createStateful } from '../../../../../../core/rxjs/helpers/index';
import { getDepartmentUsingID } from 'src/app/lib/core/auth/core/actions/department';
import { User } from 'src/app/lib/core/auth/contracts/v2';
import { TypeUtilHelper } from '../../../../../../core/helpers/type-utils-helper';
import { combineLatest } from 'rxjs';
import { doLog } from '../../../../../../core/rxjs/operators/index';
import { DynamicFormWapperComponent } from '../../../../../../core/components/dynamic-inputs/dynamic-form-control/dynamic-form-wapper/dynamic-form-wapper.component';
import { userCreatedAction, userUpdatedAction } from '../../../../../../core/auth/core/actions/app-users';
import { userFormViewModel } from 'src/app/lib/core/auth/contracts/v2/user/user';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserFormComponent implements OnDestroy {

  @ViewChild('dynamicFormWrapper', { static: false }) dynamicFormWrapper: DynamicFormWapperComponent;
  roles: { [index: string]: any }[];
  // tslint:disable-next-line: variable-name
  _destroy$ = createSubject();
  @Input() set formgroupConfig(value: { formgroup: FormGroup, form: IDynamicForm }) {
    if (value) {
      this._formgroup = this._formgroup || value.formgroup;
      this._form.next(value.form);
      if (value.form) {
        const roleControl = (value.form.controlConfigs as IHTMLFormControl[]).find((config) => config.formControlName === 'roles');
        if (roleControl) {
          this.roles = roleControl.items;
        }
      }
    }
  }
  // tslint:disable-next-line: variable-name
  private _formPrefilled = false;
  @Input() selectedUserID: number;
  selectedUser$ = this.users
    .state$
    .pipe(
      map(state => state.items[this.selectedUserID]),
      tap(state => {
        if (isDefined(state) && isDefined(this._formgroup)) {
          this.prefilFormGroup(state, this._formgroup);
        }
        if (isDefined(this._formgroup) && !this._formPrefilled) {
          if (isDefined(this._formgroup.get('department_id'))) {
            this._formgroup.get('department_id')
              .valueChanges
              .pipe(
                takeUntil(this._destroy$),
                doLog('Department selected: '),
                distinctUntilChanged(),
                tap(valueState => {
                  if (valueState) {
                    // this._formgroup.get('roles').disable({ onlySelf: true });
                    getDepartmentUsingID(this.departments.store$)(
                      this.client,
                      this.departmentsBackendPath,
                      valueState
                    );
                  }
                })
              )
              .subscribe();
          }
          setTimeout(() => {
            this._formgroup.get('roles').setValue(state ? state.roleIDs : null);
            this._formgroup.get('roles').updateValueAndValidity();
            this._formgroup.get('roles').enable({ onlySelf: false });
          }, 500);
          this._formPrefilled = true;
        }
      })
    );
  // tslint:disable-next-line: variable-name
  private _formgroup: FormGroup;
  get formgroup() {
    return this._formgroup;
  }
  // tslint:disable-next-line: variable-name
  private _form = createStateful<IDynamicForm>(null);
  get form$() {
    return this._form.asObservable();
  }
  @Input() performingAction = false;

  state$ = combineLatest([this.departments.state$, this.form$, this.selectedUser$]).pipe(
    map(([state, form, user]) => {
      const department = state.selected;
      if (isDefined(department) && isDefined(department.roles) && isDefined(form)) {
        form.controlConfigs = (form.controlConfigs as IHTMLFormControl[]).map((config) => {
          if (config.formControlName === 'roles') {
            config.items = department.roles.map((v) => {
              return {
                value: v.id,
                description: v.label,
                name: v.label
              } as ISelectItem;
            });
          }
          return config;
        });
        if (this.dynamicFormWrapper) {
          this.dynamicFormWrapper.setComponentForm(form);
        }
      }
      return { ...state, form, user };
    }),
    tap(_ => this.changeDetector.detectChanges()),
    doLog('Add User Form state...')
  );

  constructor(
    private client: DrewlabsRessourceServerClient,
    private departments: DepartmentsProvider,
    private users: UsersProvider,
    public readonly typeHelper: TypeUtilHelper,
    private changeDetector: ChangeDetectorRef,
    @Inject('AUTH_DEPARTMENTS_RESOURCE_PATH') private departmentsBackendPath: string
  ) { }

  ngOnDestroy() {
    this._destroy$.next();
    userCreatedAction(this.users.store$)(null);
    userUpdatedAction(this.users.store$)(null);
  }

  prefilFormGroup(user: User, formgroup: FormGroup) {
    if (user) {
      setTimeout(() => {
        for (const [key, value] of Object.entries(userFormViewModel())) {
          if (isDefined(formgroup.get(key))) {
            // Set is afiliated to department control to true if the user has a department id
            if (key === 'is_affiliated_to_department') {
              formgroup.get(key).setValue(
                (isDefined(user.userDetails.departmentID) || user.userInfo.isManager) ? 1 : 0);
              continue;
            }
            if (key === 'department_id') {
              formgroup.get(key).setValue(getJSObjectPropertyValue(user, value));
              continue;
            }
            // If the key is roles, only set it to the value of th roles only if the departmentID of the user info is null
            if (key === 'roles') {
              formgroup.get(key).setValue(user.roleIDs);
              continue;
            }
            // birthdate
            if ((key === 'birthdate')) {
              formgroup.get(key).setValue(
                isDefined(getJSObjectPropertyValue(user, value)) ?
                  MomentUtils.parseDate(getJSObjectPropertyValue(user, value) as string, null, 'YYYY-MM-DD') : null
              );
              continue;
            }

            if (key === 'password' || key === 'password_confirmation') {
              formgroup.get(key).clearValidators();
              formgroup.get(key).clearAsyncValidators();
              formgroup.get(key).setValidators(
                Validators.compose([
                  Validators.nullValidator,
                  Validators.min(6)
                ])
              );
              formgroup.get(key).updateValueAndValidity();
              continue;
            }
            formgroup.get(key).setValue(getJSObjectPropertyValue(user, value));
          }
        }
      }, 1000);
    }
    return formgroup;
  }

  onFormSubmit(formgroup: FormGroup, form: IDynamicForm) {
    this.setPasswordAndPasswordConfirmationErrors(formgroup, null);
    ComponentReactiveFormHelpers.validateFormGroupFields(
      formgroup
    );
    if (formgroup.valid) {
      const obj = formgroup.getRawValue();
      createUserAction(this.users.store$)(this.client, form.endpointURL, Object.assign(obj,
        { birthdate: obj.birthdate ? MomentUtils.parseDate(obj.birthdate, 'YYYY-MM-DD') : null }
      ));
    } else {
      if (formgroup.hasError('Match')) {
        this.setPasswordAndPasswordConfirmationErrors(formgroup, { Match: true });
      }
    }
  }

  onEditSelectedUser(formgroup: FormGroup, form: IDynamicForm, id: string | number) {
    this.setPasswordAndPasswordConfirmationErrors(formgroup, null);
    ComponentReactiveFormHelpers.validateFormGroupFields(
      formgroup
    );
    if (formgroup.valid) {
      const obj = formgroup.getRawValue();
      updateUserAction(this.users.store$)(this.client, form.endpointURL, id, Object.assign(obj,
        { birthdate: obj.birthdate ? MomentUtils.parseDate(obj.birthdate, 'YYYY-MM-DD') : null }
      ));
    } else {
      if (formgroup.hasError('Match')) {
        this.setPasswordAndPasswordConfirmationErrors(formgroup, { Match: true });
      }
    }
  }


  setPasswordAndPasswordConfirmationErrors(formgroup: FormGroup, error: any) {
    ['password', 'password_confirmation'].forEach((k) => {
      formgroup.get(k).setErrors(error);
    });
  }

}
