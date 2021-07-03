import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { IDynamicForm } from 'src/app/lib/core/components/dynamic-inputs/core/contracts/dynamic-form';
import { FormGroup } from '@angular/forms';
import { IHTMLFormControl, SelectInput } from 'src/app/lib/core/components/dynamic-inputs/core';
import { TypeUtilHelper } from '../../../../../core/helpers/type-utils-helper';
import { updateDepartmentV2Action, createDepartmentV2Action, departmentUpdatedAction, departmentCreated } from '../../../../../core/auth/core/actions/department';
import { DepartmentsProvider } from '../../../../../core/auth/core/providers/department';
import { DrewlabsRessourceServerClient } from '../../../../../core/http/core/ressource-server-client';
import { map, takeUntil } from 'rxjs/operators';
import { departmentFormViewModelBindings, DepartmentV2 } from '../../../../../core/auth/contracts/v2/company/department';
import { TranslationService } from 'src/app/lib/core/translator';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { combineLatest } from 'rxjs';
import { UIStateStatusCode } from 'src/app/lib/core/contracts/ui-state';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styles: []
})
export class AddDepartementComponent implements OnInit, OnDestroy {


  @Input() public form: IDynamicForm;
  // tslint:disable-next-line: variable-name
  private _componentFormGroup: FormGroup;
  @Input() set componentFormGroup(value: FormGroup) {
    this._componentFormGroup = this._componentFormGroup || value;
  }
  get componentFormGroup() {
    return this._componentFormGroup;
  }
  // tslint:disable-next-line: variable-name
  private _department: DepartmentV2;
  @Input() set department(value: DepartmentV2) {
    this._department = value;
    if (this.typeHelper.isDefined(this.componentFormGroup)) {
      this.prefilForm(value);
    }
  }
  get department() {
    return this._department;
  }
  @Output() public cancelSubmission: EventEmitter<boolean> = new EventEmitter<boolean>();

  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();
  translations$ = this.translate.translate([
    'invalidRequestParams',
    'serverRequestFailed',
    'successfulRequest'
  ]).pipe(
    takeUntil(this._destroy$)
  );

  state$ = combineLatest([
    this.departments.state$,
    this.translations$])
    .pipe(
      takeUntil(this._destroy$),
      map(([state, translations]) => {
        if (state.createdDepartment) {
          this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_CREATED);
          if (this.typeHelper.isDefined(this.componentFormGroup)) {
            this.componentFormGroup.reset();
          }
          // Makes the createdRole null after the user was notified
          setTimeout(() => {
            departmentCreated(this.departments.store$)(null);
            this.uiState.endAction();
          }, 2000);
        }

        if (state.updateResult === true) {
          this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_OK);
          // Makes the createdRole null after the user was notified
          setTimeout(() => {
            departmentUpdatedAction(this.departments.store$)(null);
            this.uiState.endAction();
          }, 2000);
        }
        return state;
      })
    );

  constructor(
    private uiState: AppUIStateProvider,
    public readonly typeHelper: TypeUtilHelper,
    private departments: DepartmentsProvider,
    private client: DrewlabsRessourceServerClient,
    private translate: TranslationService
  ) {
    this.translations$.subscribe();
    this.state$.subscribe();
  }

  async ngOnInit() { }

  prefilForm(department: DepartmentV2) {
    if (department) {
      for (const [key, value] of Object.entries(departmentFormViewModelBindings())) {
        if (this.typeHelper.isDefined(this.componentFormGroup.get(key))) {
          if (key === 'roles') {
            const roleControl = (this.form.controlConfigs as IHTMLFormControl[])
              .find((cf) => cf.formControlName === 'roles') as SelectInput;
            if (roleControl && this.typeHelper.isDefined(department.roles)) {
              this.componentFormGroup.get(key).setValue(department.roles.map((r) => r.id));
            }
            continue;
          }
          this.componentFormGroup.get(key).setValue(department[value]);
        }
      }
    }
  }

  async onFormSubmit(formgroup: FormGroup) {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      formgroup
    );
    if (formgroup.valid) {
      createDepartmentV2Action(this.departments.store$)(this.client, this.form.endpointURL, formgroup.getRawValue());
    }
  }

  async onEditFormSubmit(formgroup: FormGroup) {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      formgroup
    );
    if (formgroup.valid) {
      updateDepartmentV2Action(this.departments.store$)(
        this.client,
        this.form.endpointURL,
        this.department.id,
        formgroup.getRawValue()
      );
    }
  }

  /**
   * @description Hanldes user click cancel event
   */
  onCancelSubmission() {
    this.cancelSubmission.emit(true);
  }

  ngOnDestroy() {
    this._destroy$.next();
    departmentCreated(this.departments.store$)(null);
    departmentUpdatedAction(this.departments.store$)(null);
  }

}
