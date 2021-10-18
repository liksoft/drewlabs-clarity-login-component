import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { filter, map, take, tap } from "rxjs/operators";
import {
  IDynamicForm,
} from "src/app/lib/core/components/dynamic-inputs/core";
import { ControlOptionInterface } from "src/app/lib/core/components/dynamic-inputs/core/compact/types";
import {
  createControlOptionAction,
  deleteControlOptionAction,
  selectControlOptionAction,
  updateControlOptionAction,
} from "src/app/lib/core/components/dynamic-inputs/core/v2/actions";
import { ControlOption } from "src/app/lib/core/components/dynamic-inputs/core/v2/models";
import {
  DynamicControlParser,
  TranslatorHelperService,
  TypeUtilHelper,
} from "src/app/lib/core/helpers";
import { UIStateStatusCode } from "src/app/lib/core/contracts/ui-state";
import { combineLatest } from "rxjs";
import { ControlOptionViewComponent } from "./control-options-view.component";
import { Dialog, KEY_NAMES } from "src/app/lib/core/utils/browser";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { doLog } from "src/app/lib/core/rxjs/operators";
import {
  AbstractDynamicFormService,
  OptionsService,
} from "src/app/lib/core/components/dynamic-inputs/angular/services";
import {
  DynamicFormHelpers,
  sortRawFormControls,
} from "src/app/lib/core/components/dynamic-inputs/core/helpers";
import { select_form } from "src/app/lib/core/components/dynamic-inputs/core/v2/operators";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-control-options",
  template: `
    <div class="dashboard-preview">
      <div class="app-page-header">
        <h2>Gestionnaire des options des champs sélectionnables</h2>
        <div class="app-intro">
          Cet interface vous permet d'éditer, de filtrer et de créer des nouvel
          option de champs sélectionnable.
        </div>
      </div>
      <div *ngIf="state$ | async as state">
        <app-control-options-view
          #controlOptionViewComponent
          [selected]="state?.selected"
          (formSubmittedEvent)="onFormSubmittedEvent($event)"
          (editingEvent)="onEditingEvent($event)"
          (deleteEvent)="onDeleteEvent($event, state?.translations)"
          [form]="form"
          [formgroup]="formgroup"
        >
        </app-control-options-view>
      </div>
    </div>
  `,
  styles: [],
})
export class ControlOptionsComponent implements OnInit {
  formgroup: FormGroup;
  form: IDynamicForm;

  formState$ = this._formsService.state$.pipe(
    select_form(
      this.route.snapshot.data.formID || environment.forms.controlOptions
    ),
    filter((state) => (state ? true : false)),
    take(1),
    map((state) =>
      DynamicFormHelpers.buildFormSync(sortRawFormControls(state))
    ),
    map((state) => ({
      form: state,
      formgroup: this._parser.buildFormGroupFromDynamicForm(state),
    }))
  );

  state$ = combineLatest([
    this._provider.state$.pipe(doLog("Provider state: ")),
    this.translate.loadTranslations(),
  ]).pipe(
    map(([state, translations]) => ({
      ...state,
      translations,
    })),
    tap((state) => {
      if (this.typeHelper.isDefined(state?.selected)) {
        const serialized = ControlOption.builder().toSerialized(
          state?.selected
        );
        for (const [k, v] of Object.entries(serialized)) {
          if (this.typeHelper.isDefined(this.formgroup.get(k))) {
            this.formgroup.get(k).setValue(v);
          }
        }
      }
    }),
    // Tap
    tap((state) => {
      if (state.createResult) {
        this._uiState.endAction(
          state.translations.successfulRequest,
          UIStateStatusCode.STATUS_CREATED
        );
        this.controlOptionViewComponent.onDgRefresh();
        if (this.typeHelper.isDefined(this.formgroup)) {
          this.formgroup.reset();
        }
        setTimeout(() => {
          selectControlOptionAction(this._provider.store$)(null);
        }, 3000);
      }
      if (state?.updateResult) {
        this._uiState.endAction(
          state.translations.successfulRequest,
          UIStateStatusCode.STATUS_OK
        );
        this.controlOptionViewComponent.onDgRefresh();
        if (this.typeHelper.isDefined(this.formgroup)) {
          this.formgroup.reset();
        }
        setTimeout(() => {
          selectControlOptionAction(this._provider.store$)(null);
        }, 3000);
      }

      if (state?.deleteResult) {
        this._uiState.endAction(
          state.translations.successfulRequest,
          UIStateStatusCode.STATUS_OK
        );
        this.controlOptionViewComponent.onDgRefresh();
      }
    })
  );

  @ViewChild("controlOptionViewComponent", { static: false })
  controlOptionViewComponent: ControlOptionViewComponent;

  @HostListener("window:keydown", ["$event"]) keyEvent(event: KeyboardEvent) {
    if (event.code === KEY_NAMES.ESCAPE) {
      selectControlOptionAction(this._provider.store$)(null);
      if (this.typeHelper.isDefined(this.formgroup)) {
        this.formgroup.reset();
      }
    }
  }

  constructor(
    private _parser: DynamicControlParser,
    public readonly typeHelper: TypeUtilHelper,
    private _provider: OptionsService,
    private _uiState: AppUIStateProvider,
    public readonly translate: TranslatorHelperService,
    private dialog: Dialog,
    private _formsService: AbstractDynamicFormService,
    private route: ActivatedRoute
  ) {}

  public async ngOnInit() {
    const { form, formgroup } = await this.formState$.toPromise();
    this.form = form;
    this.formgroup = formgroup;
  }

  public onEditingEvent(event: ControlOptionInterface) {
    selectControlOptionAction(this._provider.store$)(event);
  }

  onFormSubmittedEvent(event: { [index: string]: any }) {
    // Handle update event and delete event
    this._uiState.startAction();
    if (event?.id) {
      // Update the option entry
      updateControlOptionAction(this._provider.store$)(
        this._provider.client,
        this._provider.path,
        event?.id,
        event
      );
      return;
    }
    createControlOptionAction(this._provider.store$)(
      this._provider.client,
      this._provider.path,
      event
    );
  }

  onDeleteEvent(event: ControlOptionInterface, translations: any) {
    // Prompt
    if (this.dialog.confirm(translations.validationPrompt)) {
      deleteControlOptionAction(this._provider.store$)(
        this._provider?.client,
        this._provider?.path,
        event?.id
      );
    }
  }
}
