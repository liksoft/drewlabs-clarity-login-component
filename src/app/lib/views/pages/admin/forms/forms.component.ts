import { Component, OnDestroy, ViewChild, Inject, Input } from "@angular/core";
import { FormControlAddComponent } from "./form-control-add/form-control-add.component";
import { DrewlabsRessourceServerClient } from "src/app/lib/core/http/core";
import { FormsViewComponent } from "./forms-view.component";
import { ActivatedRoute } from "@angular/router";
import { TypeUtilHelper } from "src/app/lib/core/helpers/type-utils-helper";
import { isDefined, MomentUtils } from "src/app/lib/core/utils";
import {
  createSubject,
  observableOf,
} from "../../../../core/rxjs/helpers/index";
import {
  serializeControlRequestBodyUsing,
  serializeFormFormControlRequestBodyUsing,
} from "src/app/lib/core/components/dynamic-inputs/core/v2/models";
import { DynamicControlParser } from "src/app/lib/core/helpers";
import { FormGroup } from "@angular/forms";
import { Dialog } from "../../../../core/utils/browser/window-ref";
import {
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { combineLatest } from "rxjs";
import { DynamicFormInterface } from "src/app/lib/core/components/dynamic-inputs/core/compact/types";
import {
  deleteFormFormControl,
  formControlCreatedAction,
  formControlRemovedAction,
  formControlUpdatedAction,
  formCreatedAction,
  formUpdatedAction,
  onNewFormAction,
} from "src/app/lib/core/components/dynamic-inputs/core/v2/actions/form";
import { TranslationService } from "src/app/lib/core/translator";
import {
  FORM_CONTROL_RESOURCES_PATH,
  FORM_FORM_CONTROL_RESOURCES_PATH,
  FORM_RESOURCES_PATH,
} from "src/app/lib/core/components/dynamic-inputs/dynamic-form-control";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { DynamicFormControlInterface } from "../../../../core/components/dynamic-inputs/core/compact/types";
import { httpServerHost } from "src/app/lib/core/utils/url/url";
import { UIStateStatusCode } from "src/app/lib/core/contracts/ui-state";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { IDissociateFormControlEvent } from "./types";
import { AbstractDynamicFormService } from "src/app/lib/core/components/dynamic-inputs/angular/services";
import {
  DynamicFormHelpers,
  sortRawFormControls,
} from "src/app/lib/core/components/dynamic-inputs/core/helpers";
import { select_form } from "src/app/lib/core/components/dynamic-inputs/core/v2/operators";
import { environment } from "src/environments/environment";
import { Log } from "src/app/lib/core/utils/logger";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
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
        padding: 1rem !important;
      }
      .loader-container {
        position: absolute;
        min-height: 400px;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        width: 100%;
      }
      .loader-container .spinner {
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
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

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class FormsComponent implements OnDestroy {
  @ViewChild("appFormView", { static: false })
  appFormView: FormsViewComponent;
  @ViewChild("appFormControlAddComponent", { static: false })
  appFormControlAddComponent: FormControlAddComponent;
  public showFormControlCreateModal: boolean;

  @Input() formViewContainerClass = "clr-col-lg-5 clr-col-md-12 clr-col-sm-12";
  @Input() formControlsContainerClass =
    "clr-col-lg-7 clr-col-md-12 clr-col-sm-12";

  // tslint:disable-next-line: variable-name
  _currentForm$ = createSubject<DynamicFormInterface>();

  formState$ = this.route.paramMap.pipe(
    tap(() => {
      // Listen for create, delete and update state on the form store
      this.uiState.startAction();
    }),
    switchMap((paramMap) =>
      Boolean(paramMap.get("id"))
        ? this.provider.get(paramMap.get("id"))
        : observableOf(undefined)
    ),
    tap((model) => {
      // Send the model to the forms store if form is defined
      if (model) {
        onNewFormAction(this.provider.store$)(model);
      } else {
        // Else send a null to the _currentForm$ stream
        this._currentForm$.next(null);
      }
    }),
    mergeMap(() =>
      this.provider.state$.pipe(
        select_form(this.route.snapshot.data.formID || environment.forms.forms),
        filter((state) => (state ? true : false)),
        take(1),
        map((state) => ({
          form: DynamicFormHelpers.buildFormSync(sortRawFormControls(state)),
        }))
      )
    ),
    map((state) => ({
      ...state,
      formgroup: this.controlParser.buildFormGroupFromDynamicForm(
        state.form
      ) as FormGroup,
    })),
    tap(() => {
      // Listen for create, delete and update state on the form store
      this.uiState.endAction();
    })
  );

  formControlState$ = this.provider.state$
    .pipe(
      select_form(
        this.route.snapshot.data.controlsFormID || environment?.forms.controls
      ),
      filter((state) => (state ? true : false)),
      take(1),
      map((state) =>
        DynamicFormHelpers.buildFormSync(sortRawFormControls(state))
      )
    )
    .pipe(
      map((state) => ({
        form: state,
        formgroup: this.controlParser.buildFormGroupFromDynamicForm(
          state
        ) as FormGroup,
      }))
    );

  uiState$ = this.uiState.uiState;

  state$ = combineLatest([
    this._currentForm$,
    this.formState$,
    this.formControlState$,
  ]).pipe(
    map(([model, formState, controlState]) => ({
      formState: { ...formState, model },
      controlState,
    })),
    withLatestFrom(this.uiState$),
    map(([state, uiState]) => ({
      ...state,
      performingAction: uiState.performingAction,
    }))
  );

  providersStateWithTranslations$ = combineLatest([
    this.provider.state$,
    this.translate.translate([
      "invalidRequestParams",
      "serverRequestFailed",
      "successfulRequest",
      "prompt",
      "forms.createControlSuccess",
      "forms.deleteControlSuccess",
      "forms.updateControlSuccess",
    ]),
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
        this.uiState.endAction(
          translations.successfulRequest,
          UIStateStatusCode.STATUS_CREATED
        );
        formCreatedAction(this.provider.store$)({ createResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
      if (forms.updateResult) {
        this.uiState.endAction(
          translations.successfulRequest,
          UIStateStatusCode.STATUS_OK
        );
        formUpdatedAction(this.provider.store$)({ updateResult: null });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.createControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.createControlSuccess"]}`,
          UIStateStatusCode.STATUS_CREATED
        );
        this.appFormControlAddComponent.resetFormGroup();
        formControlCreatedAction(this.provider.store$)({
          createControlResult: null,
        });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.updateControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.updateControlSuccess"]}`,
          UIStateStatusCode.STATUS_OK
        );
        formControlUpdatedAction(this.provider.store$)({
          updateControlResult: null,
        });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }

      if (forms.deleteControlResult) {
        this.uiState.endAction(
          `${translations.successfulRequest} ${translations["forms.deleteControlSuccess"]}`,
          UIStateStatusCode.STATUS_OK
        );
        formControlRemovedAction(this.provider.store$)({
          deleteControlResult: null,
        });
        setTimeout(() => {
          this.uiState.endAction();
        }, 3000);
      }
    })
  );

  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  constructor(
    private uiState: AppUIStateProvider,
    private route: ActivatedRoute,
    public readonly typeHelper: TypeUtilHelper,
    private controlParser: DynamicControlParser,
    private dialog: Dialog,
    private translate: TranslationService,
    private provider: AbstractDynamicFormService,
    private client: DrewlabsRessourceServerClient,
    @Inject(FORM_RESOURCES_PATH) private path: string,
    @Inject(FORM_FORM_CONTROL_RESOURCES_PATH) private fFormControlsPath: string,
    @Inject(FORM_CONTROL_RESOURCES_PATH) private formControlsPath: string,
    @Inject("FORM_SERVER_HOST") private host: string
  ) {
    this.showFormControlCreateModal = false;
    this.providersStateWithTranslations$
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  async onFormviewFormSubmitted(event: { [index: string]: any }) {
    this.uiState.startAction();
    this.provider.create(
      `${httpServerHost(this.host)}/${event.requestURL || this.path}`,
      event.body
    );
  }

  onUpdateFormEvent(event: { [index: string]: any }) {
    this.provider.update(
      `${httpServerHost(this.host)}/${event.requestURL || this.path}/${
        event.id
      }`,
      event.body
    );
  }

  async updateOrCreateControl({
    event,
    form,
  }: {
    event: { [index: string]: any };
    form: DynamicFormInterface;
  }) {
    if (isDefined(event.body)) {
      let { id, body } = {
        body: event?.body,
        id: event?.id,
      };
      this.uiState.startAction();
      // #region Create FormControl and FormFormControl request body
      const formFormControlRequestBody =
        serializeFormFormControlRequestBodyUsing({
          ...body,
          form_id: form.id,
        });
      const formControlsRequestBody = serializeControlRequestBodyUsing(
        event.body
      );
      //!#endregion Create FormControl and FormFormControl request body
      body = {
        ...formControlsRequestBody,
        min_date: formControlsRequestBody.min_date
          ? MomentUtils.parseDate(
              formControlsRequestBody.min_date,
              "YYYY-MM-DD"
            )
          : null,
        max_date: formControlsRequestBody.max_date
          ? MomentUtils.parseDate(
              formControlsRequestBody.max_date,
              "YYYY-MM-DD"
            )
          : null,
        multiple: formControlsRequestBody?.multiple || false,
        form_form_controls: { ...formFormControlRequestBody },
      };
      id
        ? this.provider.updateControl(
            `${httpServerHost(this.host)}/${this.formControlsPath}/${
              (event as { [index: string]: any }).id
            }`,
            body
          )
        : this.provider.createControl(
            `${httpServerHost(this.host)}/${this.formControlsPath}`,
            body
          );
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
    const translations = await this.translate.translate(["prompt"]).toPromise();
    if (this.dialog.confirm(translations.prompt)) {
      deleteFormFormControl(this.provider.store$)(
        this.client,
        `${httpServerHost(this.host)}/${this.fFormControlsPath}/${
          value.control.formId
        }/${value.control.id}`,
        {},
        value.control.id
      );
    }
  }

  onControlDropped(
    event: CdkDragDrop<any>,
    control: DynamicFormControlInterface
  ) {
    if (!(event.previousIndex === event.currentIndex)) {
      this.provider.updateControl(
        `${httpServerHost(this.host)}/${this.formControlsPath}/${control.id}`,
        {
          form_form_controls: serializeFormFormControlRequestBodyUsing({
            form_id: control.formId,
            index: event.currentIndex + 1,
          }),
        }
      );
    }
  }

  ngOnDestroy() {
    formCreatedAction(this.provider.store$)({
      createResult: null,
      currentForm: null,
    });
    formControlUpdatedAction(this.provider.store$)({
      createResult: null,
      currentForm: null,
    });
    this.uiState.intialize();
    this._destroy$.next({});
  }
}
