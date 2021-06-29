import { Component, OnDestroy, ViewChild, Inject, Input } from '@angular/core';
import { FormControlAddComponent } from './form-control-add/form-control-add.component';
import { FormService } from 'src/app/lib/core/components/dynamic-inputs/core/form-control/form.service';
import { DrewlabsRessourceServerClient } from 'src/app/lib/core/http/core';
import { FormsViewComponent } from './forms-view.component';
import { ActivatedRoute } from '@angular/router';
import { IDissociateFormControlEvent } from './form-component.service';
import { TypeUtilHelper } from 'src/app/lib/core/helpers/type-utils-helper';
import { isDefined, MomentUtils } from 'src/app/lib/core/utils';
import { createSubject, observableFrom, observableOf } from '../../../../core/rxjs/helpers/index';
import {
  serializeControlRequestBodyUsing, serializeFormFormControlRequestBodyUsing
} from 'src/app/lib/core/components/dynamic-inputs/core/v2/models';
import { DynamicControlParser } from 'src/app/lib/core/helpers';
import { FormGroup } from '@angular/forms';
import { Dialog } from '../../../../core/utils/browser/window-ref';
import { map, mergeMap, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DynamicFormInterface } from 'src/app/lib/core/components/dynamic-inputs/core/compact/types';
import { FormsProvider } from 'src/app/lib/core/components/dynamic-inputs/core/v2/providers/form';
import {
  createFormAction,
  createFormControlAction,
  deleteFormFormControl,
  formControlCreatedAction,
  formControlRemovedAction,
  formControlUpdatedAction,
  formCreatedAction,
  formUpdatedAction,
  onNewFormAction,
  updateFormAction,
  updateFormControlAction
} from 'src/app/lib/core/components/dynamic-inputs/core/v2/actions/form';
import { TranslationService } from 'src/app/lib/core/translator';
import { ISerializableBuilder } from 'src/app/lib/core/built-value/contracts';
import { FormV2 } from 'src/app/lib/core/components/dynamic-inputs/core/v2/models/form';
import { FORM_CONTROL_RESOURCES_PATH, FORM_FORM_CONTROL_RESOURCES_PATH, FORM_RESOURCES_PATH } from 'src/app/lib/core/components/dynamic-inputs/dynamic-form-control';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { sortFormFormControlsByIndex } from '../../../../core/components/dynamic-inputs/core';
import { STATIC_FORMS } from '../../../../core/components/dynamic-inputs/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DynamicFormControlInterface } from '../../../../core/components/dynamic-inputs/core/compact/types';
import { httpServerHost } from 'src/app/lib/core/utils/url/url';
import { DynamicFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';
import { UIStateStatusCode } from 'src/app/lib/core/contracts/ui-state';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: [
    `
    .alter-container {
      margin-bottom: 16px;
    }

    .fields-container {
      background: #f1f1f1;
      border: 2px dashed #999;
      min-height: 480px;
      position: relative;
    }
    .field-content {
      padding: 1rem!important;
    }
    .loader-container {
      position: absolute;
      min-height: 400px;
      height: 100%;
      background: rgba(255, 255, 255, .9);
      width: 100%;
    }
    .loader-container .spinner {
      margin: auto;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      display: block;
    }
    .form-view-container {
      padding-top: 1rem;
    }
    .section-title {
        font-size: 1.2rem;
        font-weight: 400;
    }
    .example-list {
      width: 100% !important;
      max-width: 100%;
      min-height: 60px;
      display: block;
    }

    .example-box {
      color: rgba(0, 0, 0, 0.87);
      box-sizing: border-box;
      cursor: move;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .example-box:last-child {
      border: none;
    }

    .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class FormsComponent implements OnDestroy {
  @ViewChild('appFormView', { static: false })
  appFormView: FormsViewComponent;
  @ViewChild('appFormControlAddComponent', { static: false })
  appFormControlAddComponent: FormControlAddComponent;
  public showFormControlCreateModal: boolean;

  @Input() formViewContainerClass = 'clr-col-lg-5 clr-col-md-12 clr-col-sm-12';
  @Input() formControlsContainerClass = 'clr-col-lg-7 clr-col-md-12 clr-col-sm-12';

  // tslint:disable-next-line: variable-name
  _currentForm$ = createSubject<DynamicFormInterface>();

  formState$ = this.route.paramMap.pipe(
    tap(() => {
      // Listen for create, delete and update state on the form store
      this.uiState.startAction();
    }),
    switchMap(paramMap => isDefined(paramMap.get('id')) ? this.formService.rxGetForm(paramMap.get('id')) : observableOf(false)),
    doLog('Emitted value: '),
    tap(model => {
      // Send the model to the forms store if form is defined
      if (model) {
        onNewFormAction(this.formsProvider.store$)(model);
      } else {
        // Else send a null to the _currentForm$ stream
        this._currentForm$.next(null);
      }
    }),
    mergeMap(() => observableFrom(DynamicFormHelpers.buildDynamicForm(STATIC_FORMS.createForm)).pipe(
      map(form => ({ form }))
    )),
    map(state => ({
      ...state,
      formgroup: this.controlParser.buildFormGroupFromDynamicForm(
        state.form,
      ) as FormGroup
    })),
    tap(() => {
      // Listen for create, delete and update state on the form store
      this.uiState.endAction();
    })
  );

  formControlState$ = observableFrom(DynamicFormHelpers.buildDynamicForm(
    (FormV2.builder() as ISerializableBuilder<FormV2>).fromSerialized(STATIC_FORMS.createFormControl),
  )).pipe(
    map(state => ({
      form: state,
      formgroup: this.controlParser.buildFormGroupFromDynamicForm(
        state
      ) as FormGroup
    }))
  );

  uiState$ = this.uiState.uiState;

  state$ = combineLatest([
    this._currentForm$.pipe(
      doLog('Current Form value: '),
    ),
    this.formState$.pipe(
      doLog('Form state: ')
    ),
    this.formControlState$.pipe(
      doLog('Form Control state: ')
    )
  ])
    .pipe(
      doLog('Create form component state: '),
      map(([model, formState, controlState]) => ({
        formState: { ...formState, model },
        controlState
      })),
      withLatestFrom(this.uiState$),
      map(([state, uiState]) => ({
        ...state,
        performingAction: uiState.performingAction
      }))
    );

  providersStateWithTranslations$ = combineLatest([
    this.formsProvider.state$,
    this.translate.translate([
      'invalidRequestParams',
      'serverRequestFailed',
      'successfulRequest',
      'prompt',
      'forms.createControlSuccess',
      'forms.deleteControlSuccess',
      'forms.updateControlSuccess'
    ])
  ]).pipe(
    tap(([forms, translations]) => {
      const { currentForm } = forms;
      if (currentForm) {
        this._currentForm$.next(currentForm);
      }
      if (forms.performingAction) {
        this.uiState.startAction();
      }
      if (forms.createResult) {
        this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_CREATED);
        formCreatedAction(this.formsProvider.store$)({ createResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
      if (forms.updateResult) {
        this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_OK);
        formUpdatedAction(this.formsProvider.store$)({ updateResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.createControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations['forms.createControlSuccess']}`,
          UIStateStatusCode.STATUS_CREATED
        );
        this.appFormControlAddComponent.resetFormGroup();
        formControlCreatedAction(this.formsProvider.store$)({ createControlResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.updateControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations['forms.updateControlSuccess']}`,
          UIStateStatusCode.STATUS_OK
        );
        formControlUpdatedAction(this.formsProvider.store$)({ updateControlResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.deleteControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations['forms.deleteControlSuccess']}`,
          UIStateStatusCode.STATUS_OK
        );
        formControlRemovedAction(this.formsProvider.store$)({ deleteControlResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
    }),
  );

  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  // Function for sorting form controls by their index
  public sortControlsByIndex = () => {
    return (value: DynamicFormInterface) => sortFormFormControlsByIndex(value);
  }

  constructor(
    private uiState: AppUIStateProvider,
    private formService: FormService,
    private route: ActivatedRoute,
    public readonly typeHelper: TypeUtilHelper,
    private controlParser: DynamicControlParser,
    private dialog: Dialog,
    private translate: TranslationService,
    private formsProvider: FormsProvider,
    private client: DrewlabsRessourceServerClient,
    @Inject(FORM_RESOURCES_PATH) private path: string,
    @Inject(FORM_FORM_CONTROL_RESOURCES_PATH) private fFormControlsPath: string,
    @Inject(FORM_CONTROL_RESOURCES_PATH) private formControlsPath: string,
    @Inject('FORM_SERVER_HOST') private host: string,
  ) {
    this.showFormControlCreateModal = false;
    this.providersStateWithTranslations$.pipe(
      takeUntil(this._destroy$)
    ).subscribe();
  }

  async onFormviewFormSubmitted(event: { [index: string]: any }) {
    this.uiState.startAction();
    createFormAction(this.formsProvider.store$)(this.client, `${httpServerHost(this.host)}/${event.requestURL || this.path}`, event.body);
  }

  onUpdateFormEvent(event: { [index: string]: any }) {
    updateFormAction(this.formsProvider.store$)(this.client, `${httpServerHost(this.host)}/${event.requestURL || this.path}/${event.id}`, event.body);
  }

  async updateOrCreateControl({ event, form }: { event: { [index: string]: any }, form: DynamicFormInterface }) {
    this.uiState.startAction();
    if (isDefined(event.body)) {
      const formFormControlRequestBody = serializeFormFormControlRequestBodyUsing({
        ...event.body,
        form_id: form.id
      });
      const formControlsRequestBody = serializeControlRequestBodyUsing(event.body);
      const body = Object.assign(
        formControlsRequestBody,
        {
          min_date: this.typeHelper.isDefined(formControlsRequestBody.min_date) ?
            MomentUtils.parseDate(formControlsRequestBody.min_date, 'YYYY-MM-DD') : null,
          max_date: this.typeHelper.isDefined(formControlsRequestBody.max_date) ?
            MomentUtils.parseDate(formControlsRequestBody.max_date, 'YYYY-MM-DD') : null,
        },
        {
          form_form_controls: formFormControlRequestBody
        }
      );
      if (this.typeHelper.isDefined((event as { [index: string]: any }).id)) {
        updateFormControlAction(this.formsProvider.store$)(
          this.client,
          `${httpServerHost(this.host)}/${this.formControlsPath}/${(event as { [index: string]: any }).id}`,
          body
        );
      } else {
        createFormControlAction(this.formsProvider.store$)(
          this.client,
          `${httpServerHost(this.host)}/${this.formControlsPath}`,
          body
        );
      }
    }
  }

  onCancelCreateFormControl(event: boolean) {
    this.uiState.intialize();
    this.showFormControlCreateModal = false;
  }

  loadFormControlComponent(event: Event) {
    this.uiState.intialize();
    event.preventDefault();
    this.showFormControlCreateModal = true;
  }

  async onDissociateFormControl(value: IDissociateFormControlEvent) {
    const translations = await this.translate.translate(['prompt']).toPromise();
    if (this.dialog.confirm(translations.prompt)) {
      deleteFormFormControl(this.formsProvider.store$)(
        this.client,
        `${httpServerHost(this.host)}/${this.fFormControlsPath}/${value.control.formId}/${value.control.id}`,
        {},
        value.control.id
      );
    }
  }

  controlComponentDropped(form: DynamicFormInterface, event: CdkDragDrop<string[]>) { }

  onControlDropped(event: CdkDragDrop<any>, control: DynamicFormControlInterface) {
    if (!(event.previousIndex === event.currentIndex)) {
      updateFormControlAction(this.formsProvider.store$)(
        this.client,
        `${httpServerHost(this.host)}/${this.formControlsPath}/${control.id}`,
        {
          form_form_controls: serializeFormFormControlRequestBodyUsing({
            form_id: control.formId,
            index: event.currentIndex + 1
          })
        }
      );
    }
  }


  ngOnDestroy() {
    formCreatedAction(this.formsProvider.store$)({ createResult: null, currentForm: null });
    formControlUpdatedAction(this.formsProvider.store$)({ createResult: null, currentForm: null });
    this.uiState.intialize();
    this._destroy$.next({});
  }

}
