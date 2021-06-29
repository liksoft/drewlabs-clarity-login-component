import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicForm } from 'src/app/lib/core/components/dynamic-inputs/core';
import { FormComponentService } from './form-component.service';
import { DynamicControlParser } from 'src/app/lib/core/helpers/dynamic-control-parser';
import { TypeUtilHelper } from 'src/app/lib/core/helpers/type-utils-helper';
import { Dialog, isDefined } from 'src/app/lib/core/utils';
import { DynamicFormInterface } from 'src/app/lib/core/components/dynamic-inputs/core/compact/types';
import { formViewModelBindings } from 'src/app/lib/core/components/dynamic-inputs/core/compact';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';

@Component({
  selector: 'app-forms-view',
  templateUrl: './forms-view.component.html',
  styles: []
})
export class FormsViewComponent {
  componentFormGroup: FormGroup;
  form: IDynamicForm;
  @Output() formSubmitted = new EventEmitter<{ [index: string]: any }>();
  @Output() cancelSubmission = new EventEmitter<boolean>();
  @Output() addFormControl = new EventEmitter<object | Event>();
  @Output() updateFormEvent = new EventEmitter<{ [index: string]: any }>();
  // tslint:disable-next-line: no-inferrable-types
  @Input() performingAction: boolean = false;

  get currentForm() {
    return this._currentForm;
  }
  // tslint:disable-next-line: variable-name
  _currentForm: DynamicFormInterface;

  @Input() set formViewState(value: { form: IDynamicForm, model: DynamicFormInterface, formgroup: FormGroup }) {
    if (value) {
      this._formViewState = value;
      this.form = value.form ? value.form : this.form;
      this.componentFormGroup = value.formgroup ? value.formgroup : this.componentFormGroup;
      this._currentForm = value.model ? value.model : this._currentForm;
      this.prefilForm();
    }
  }
  get formViewState() {
    return this._formViewState;
  }
  // tslint:disable-next-line: variable-name
  _formViewState: { form: IDynamicForm, model: DynamicFormInterface, formgroup: FormGroup };

  public requestError: Error;

  /**
   * @description Component object instance initializer
   * @param builder [[FormBuilder]] Angular ReactiveForm FormBuilder
   * @param appUIStoreManager [[AppUIStoreManager]]
   */
  constructor(
    private formComponentService: FormComponentService,
    private controlParser: DynamicControlParser,
    private dialog: Dialog,
    private typeHelper: TypeUtilHelper
  ) {
  }

  cancel() {
    this.cancelSubmission.emit(true);
  }

  onFormSubmit() {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      // Fire formSubmitted event with the formGroup value
      this.formSubmitted.emit({ body: this.componentFormGroup.getRawValue(), requestURL: this.form.endpointURL });
    }
  }

  prefilForm() {
    if (isDefined(this.currentForm)) {
      for (const [key, value] of Object.entries(formViewModelBindings())) {
        if (isDefined(this.componentFormGroup.get(key))) {
          this.componentFormGroup.get(key).setValue(this.currentForm[value]);
        }
      }
    }
  }

  onFormRequestSubmittedSuccessfully() {
    this.componentFormGroup = this.controlParser.buildFormGroupFromDynamicForm(
      this.form,
      !this.typeHelper.isDefined(this.currentForm)
    ) as FormGroup;
  }

  isDefined(value: any) {
    return isDefined(value);
  }

  async onClickedEditForm(form: DynamicFormInterface) {
    // Handle Edit operations
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      this.updateFormEvent.emit({ requestURL: this.form.endpointURL, id: form.id, body: this.componentFormGroup.getRawValue() });
    }
  }

  async dissociateForm(id: number | string) {
    const translations = await this.formComponentService.loadTranslations();
    if (this.dialog.confirm(translations.prompt)) {
      this.updateFormEvent.emit({ requestURL: this.form.endpointURL, id, body: { dissociate_parent: true } });
    }
  }
}
