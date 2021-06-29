import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { DynamicFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';
import { IDynamicForm, STATIC_FORMS } from 'src/app/lib/core/components/dynamic-inputs/core';
import { ControlOptionInterface } from 'src/app/lib/core/components/dynamic-inputs/core/compact/types';
import { createControlOptionAction, deleteControlOptionAction, selectControlOptionAction, updateControlOptionAction } from 'src/app/lib/core/components/dynamic-inputs/core/v2/actions';
import { ControlOption } from 'src/app/lib/core/components/dynamic-inputs/core/v2/models';
import { ControlOptionsProvider } from 'src/app/lib/core/components/dynamic-inputs/core/v2/providers';
import { DynamicControlParser, TranslatorHelperService, TypeUtilHelper } from 'src/app/lib/core/helpers';
import { UIStateStatusCode } from 'src/app/lib/core/contracts/ui-state';
import { combineLatest } from 'rxjs';
import { ControlOptionViewComponent } from './control-options-view.component';
import { Dialog, KEY_NAMES } from 'src/app/lib/core/utils/browser';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';

@Component({
  selector: 'app-control-options',
  template: `
      <div class="dashboard-preview">
        <div class="app-page-header">
          <h2>Gestionnaire des options des champs sélectionnables</h2>
          <div class="app-intro">
            Cet interface vous permet d'éditer, de filtrer et de créer des nouvel option de champs sélectionnable.
          </div>
        </div>
        <div *ngIf="state$ | async as state">
          <app-control-options-view #controlOptionViewComponent [selected]="state?.selected" 
          (formSubmittedEvent)="onFormSubmittedEvent($event)" 
          (editingEvent)="onEditingEvent($event)"
          (deleteEvent)="onDeleteEvent($event, state?.translations)"
          [form]="form" 
          [formgroup]="formgroup">
          </app-control-options-view>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class ControlOptionsComponent implements OnInit {

  formgroup: FormGroup;
  form: IDynamicForm;
  state$ = combineLatest([
    this._provider.state$,
    this.translate.loadTranslations()
  ]).pipe(
    map(([state, translations]) => ({
      ...state,
      translations
    })),
    tap(state => {
      if (this.typeHelper.isDefined(state?.selected)) {
        const serialized = ControlOption.builder().toSerialized(state?.selected);
        for (const [k, v] of Object.entries(serialized)) {
          if (this.typeHelper.isDefined(this.formgroup.get(k))) {
            this.formgroup.get(k).setValue(v);
          }
        }
      }
    }),
    // Tap
    tap(state => {
      if (state.createResult) {
        this._uiState.endAction(state.translations.successfulRequest, UIStateStatusCode.STATUS_CREATED);
        this.controlOptionViewComponent.onDgRefresh();
        if (this.typeHelper.isDefined(this.formgroup)) {
          this.formgroup.reset();
        }
        setTimeout(() => {
          selectControlOptionAction(this._provider.store$)(null);
        }, 3000);
      }
      if (state?.updateResult) {
        this._uiState.endAction(state.translations.successfulRequest, UIStateStatusCode.STATUS_OK);
        this.controlOptionViewComponent.onDgRefresh();
      }

      if (state?.deleteResult) {
        this._uiState.endAction(state.translations.successfulRequest, UIStateStatusCode.STATUS_OK);
        this.controlOptionViewComponent.onDgRefresh();
      }
    })
  );

  @ViewChild('controlOptionViewComponent', { static: false }) controlOptionViewComponent: ControlOptionViewComponent;

  @HostListener('window:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
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
    private _provider: ControlOptionsProvider,
    private _uiState: AppUIStateProvider,
    public readonly translate: TranslatorHelperService,
    private dialog: Dialog
  ) { }

  public async ngOnInit() {
    this.formgroup = this._parser.buildFormGroupFromDynamicForm(
      this.form = await DynamicFormHelpers.buildDynamicForm(STATIC_FORMS.createControlOptions));
  }

  public onEditingEvent(event: ControlOptionInterface) {
    selectControlOptionAction(this._provider.store$)(event);
  }

  onFormSubmittedEvent(event: { [index: string]: any }) {
    // Handle update event and delete event
    this._uiState.startAction();
    if (event?.id) {
      // Update the option entry
      updateControlOptionAction(this._provider.store$)(this._provider.client, this._provider.path, event?.id, event);
      return;
    }
    createControlOptionAction(this._provider.store$)(this._provider.client, this._provider.path, event);
  }

  onDeleteEvent(event: ControlOptionInterface, translations: any) {
    // Prompt
    if (this.dialog.confirm(translations.validationPrompt)) {
      deleteControlOptionAction(this._provider.store$)(this._provider?.client, this._provider?.path, event?.id);
    }
  }

  ngOnDestroy() : void {}

}
