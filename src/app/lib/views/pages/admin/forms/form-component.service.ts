// import { Injectable } from '@angular/core';
// import { TypeBuilder } from 'src/app/lib/core/built-value/contracts/type';
// import { ISerializableBuilder } from 'src/app/lib/core/built-value/contracts/serializers';
// import { TranslationService } from 'src/app/lib/core/translator';
// import { isDefined } from 'src/app/lib/core/utils';
// import { DynamicFormInterface } from 'src/app/lib/core/components/dynamic-inputs/core/compact/types';
// import { STATIC_FORMS } from '../../../../core/components/dynamic-inputs/core';
// import { ControlOptionInterface, DynamicFormControlInterface } from '../../../../core/components/dynamic-inputs/core/compact/types';
// import { FormControlV2 } from '../../../../core/components/dynamic-inputs/core/v2/models/form-control';
// import { FormV2 } from '../../../../core/components/dynamic-inputs/core/v2/models/form';
// import { DynamicFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';
// import * as _ from 'lodash';

// /**
//  * @description Interface definition for dissociate form control event
//  */
// export interface IDissociateFormControlEvent {
//   control: DynamicFormControlInterface;
//   form: DynamicFormInterface;
// }

// @Injectable()
// export class FormComponentService {

//   constructor(public translate: TranslationService) { }

//   /**
//    * @description Returns a list of translation that can be use on the form component and it children
//    */
//   loadTranslations(): Promise<any> {
//     return this.translate.translate([
//       'invalidRequestParams',
//       'serverRequestFailed',
//       'successfulRequest',
//       'prompt'
//     ]).toPromise();
//   }

//   /**
//    * @description Parse a form group values and return only keys matching the form control request inputs
//    * @param formValue [[object]]
//    */
//   buildFormControlRequestBody(formValue: object): object {
//     const obj: object = {};
//     // Build the formControl request body
//     Object.keys(formValue).forEach((key) => {
//       if (key.startsWith('form_controls_')) {
//         if (key === 'form_controls_selectable_values' && isDefined(formValue[key])) {
//           // Removes the last | character at the end of the string if any
//           formValue[key] = (formValue[key] as string).endsWith('|')
//             ? (formValue[key] as string).substring(0, (formValue[key] as string).length - 1)
//             : formValue[key]; // form_controls_selectable_values
//         }
//         obj[key] = formValue[key];
//       }
//     });
//     return obj;
//   }

//   /**
//    * @description Parse a form group values and return only keys matching the form form control request inputs
//    * @param formValue [[object]]
//    */
//   buildFormFormControlRequestBody(formValue: object): object {
//     const obj: object = {};
//     // Build the form form control request body
//     Object.keys(formValue).forEach((key) => {
//       if (key.startsWith('f_form_controls_')) {
//         obj[key] = formValue[key];
//       }
//     });
//     return obj;
//   }

//   /**
//    * Update a form-control property at a given index that matches the matcher value with the updateValue
//    * @param form [[Form]]
//    * @param matcher [[string]]
//    * @param updateKey [[string]]
//    * @param updateValue [[any]]
//    */
//   updateFormControlValueBasedOnControlName(
//     form: Partial<DynamicFormInterface>, matcher: string, updateKey: string, updateValue: any) {
//     const obj = {};
//     obj[updateKey] = updateValue;
//     const items = _.list(form.formControls);
//     const index = items.findIndex((value: DynamicFormControlInterface) => value.controlName === matcher);
//     form.formControls = items.set(
//       index, (FormControlV2.builder() as TypeBuilder<DynamicFormControlInterface>).rebuild(items.get(index) as DynamicFormControlInterface, obj)).toArray();
//     return form;
//   }

//   /**
//    * @description Build Predefined Create new form / update form dynamic form
//    * @param forms [[Form[]]]
//    */
//   buildPredefinedCreateForm(forms: DynamicFormInterface[], currentForm: DynamicFormInterface) {
//     if (isDefined(currentForm)) {
//       forms = forms.filter((value) => value.id !== currentForm.id);
//     }
//     return DynamicFormHelpers.buildDynamicForm(
//       this.updateFormControlValueBasedOnControlName(
//         (FormV2.builder()).fromSerialized(STATIC_FORMS.createForm),
//         'parent_id',
//         'options',
//         forms.map((f: DynamicFormInterface) => Object.assign({}, { id: f.id, title: f.title }))),
//     );
//   }

//   buildPredefinedCreateFormControlForm(formcontrolOptions: ControlOptionInterface[]) {
//     const form = (FormV2.builder() as ISerializableBuilder<DynamicFormInterface>).fromSerialized(STATIC_FORMS.createFormControl);
//     form.children[0] = this.updateFormControlValueBasedOnControlName(
//       form.children[0],
//       'selectable_model',
//       'options',
//       formcontrolOptions.map((f: ControlOptionInterface) => ({ ...{ id: f.table, value: f.table } })));
//     return DynamicFormHelpers.buildDynamicForm(form);
//   }
// }
