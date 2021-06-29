import { Component, Input, OnDestroy, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { Collection } from 'src/app/lib/core/collections';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';
import { IDynamicForm, IHTMLFormControl } from 'src/app/lib/core/components/dynamic-inputs/core';
import { ControlOptionInterface } from 'src/app/lib/core/components/dynamic-inputs/core/compact/types';
import { ControlOptionsProvider } from 'src/app/lib/core/components/dynamic-inputs/core/v2/providers/control-options';
import { ICollection } from 'src/app/lib/core/contracts/collection-interface';
import { TypeUtilHelper } from 'src/app/lib/core/helpers';
import { mapPaginatorStateWith } from 'src/app/lib/core/pagination/helpers';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { doLog } from 'src/app/lib/core/rxjs/operators';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';
import { Log } from 'src/app/lib/core/utils/logger';

@Component({
  selector: 'app-control-options-view',
  template: `
      <ng-container *ngIf="state$ | async as vm">
        <clr-datagrid #clrDataGrid (clrDgRefresh)="onDgRefresh($event)" [clrDgLoading]="vm?.performingAction"
          class="datagrid-compact">
          <clr-dg-action-bar>
            <drewlabs-datgrid-header [refreshButtonDisabled]="vm?.performingAction" [createButtonDisabled]="true" (refreshEvent)="onDgRefresh()" [showAssignmentButton]="false"
              [showExportDropdown]="false">
            </drewlabs-datgrid-header>
          </clr-dg-action-bar>
          <clr-dg-column [clrDgField]="'id'">ID/Model (PHP)</clr-dg-column>
          <clr-dg-column [clrDgField]="'table'">Table</clr-dg-column>
          <clr-dg-column [clrDgField]="'display_label'">Libellé</clr-dg-column>
          <clr-dg-column [clrDgField]="'keyfield'">Champ ID</clr-dg-column>
          <clr-dg-column [clrDgField]="'valuefield'">Champ Libellé</clr-dg-column>
          <clr-dg-column [clrDgField]="'groupfield'">Goupé Par</clr-dg-column>
          <clr-dg-row>
            <ng-container *ngFor="let name of controlNames; let last=last">
              <clr-dg-cell [class]="last ? 'cell-last' : 'cell'">
                <app-dynamic-inputs [inline]="true" [showLabelAndDescription]="false" *ngIf="typeHelper?.isDefined(formgroup.controls[name])" [control]="formgroup.controls[name]" [inputConfig]="controlConfigs?.get(name)">
                </app-dynamic-inputs>
                <button (click)="onSubmitBtnClicked()"  *ngIf="last" class="btn submit-btn"> <!--<clr-icon shape="check"></clr-icon> --> OK </button>
              </clr-dg-cell>
            </ng-container>
          </clr-dg-row>
          <clr-dg-row *ngFor="let item of vm?.source?.data">
            <clr-dg-action-overflow>
              <button class="action-item" (click)="editBtnClicked(item)">ÉDITER</button>
              <button class="action-item" (click)="deleteBtnClicked(item)">SUPPRIMER</button>
            </clr-dg-action-overflow>
            <clr-dg-cell>{{ item.id }}</clr-dg-cell>
            <clr-dg-cell>{{ item?.table }}</clr-dg-cell>
            <clr-dg-cell>{{ item?.displayLabel }}</clr-dg-cell>
            <clr-dg-cell>{{ item?.keyfield }}</clr-dg-cell>
            <clr-dg-cell>{{ item.description }}</clr-dg-cell>
            <clr-dg-cell>{{ item.groupfield }}</clr-dg-cell>
          </clr-dg-row>
          <clr-dg-footer>
            {{ vm?.source?.total }} {{'options' | translate }}
            <clr-dg-pagination [clrDgPageSize]="10" #pagination [clrDgTotalItems]="vm?.source?.total">
              <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 30]"></clr-dg-page-size>
            </clr-dg-pagination>
          </clr-dg-footer>
        </clr-datagrid>
      </ng-container>
  `,
  styles: [
    `
      .submit-btn {
        display: block;
        position: absolute;
        top: 0;
        padding: 0;
        margin: 0;
        right: 0;
        border: none;
        min-width: 2.5rem !important;
      }
      
      .cell-last {
        position: relative;
      }
    `
  ]
})
export class ControlOptionViewComponent implements OnDestroy {

  @Input() selected: ControlOptionInterface;
  @Input() formgroup: FormGroup;
  private _form: IDynamicForm;
  @Input() set form(value: IDynamicForm) {
    this._form = value;
    // Build a collection of control configs in order optimize data control binding on the UI
    if (value) {
      (value.controlConfigs as IHTMLFormControl[]).forEach(config => this.controlConfigs.add(config?.formControlName, config))
    }
  }
  get form() {
    return this._form;
  }

  @Output() editingEvent = new EventEmitter<ControlOptionInterface>();
  @Output() deleteEvent = new EventEmitter<ControlOptionInterface>();
  @Output() formSubmittedEvent = new EventEmitter<{ [index: string]: any }>();

  // Collection of controls configuration object
  controlConfigs: ICollection<IHTMLFormControl> = new Collection<IHTMLFormControl>();
  controlNames = [
    'model',
    'table',
    'display_label',
    'keyfield',
    'valuefield',
    'groupfield'
  ];

  initialGridState = { page: { current: 1, size: 20 } };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();

  gridState$ = this._datagridState$.pipe(
    startWith(this.initialGridState),
    takeUntil(this._destroy$),
    debounceTime(500),
    distinctUntilChanged(),
    doLog('Forms Datagrid state: '),
    tap(_ => this._uiState.startAction()),
    switchMap((state: ClrDatagridStateInterface) => this._provider.paginate(state)),
    tap(_ => this._uiState.endAction()),
  );

  state$ = combineLatest([
    this._uiState.uiState,
    this.gridState$
  ]).pipe(
    map(([uiState, gridState]) => ({
      ...uiState,
      source: gridState
    }))
  );

  @ViewChild('clrDataGrid', { static: false }) dataGrid: ClrDatagrid;

  constructor(
    private _provider: ControlOptionsProvider,
    private _uiState: AppUIStateProvider,
    public readonly typeHelper: TypeUtilHelper
  ) { }

  editBtnClicked(event: ControlOptionInterface) {
    this.editingEvent.emit(event);
  }

  deleteBtnClicked(event: ControlOptionInterface) {
    this.deleteEvent.emit(event);
  }

  onSubmitBtnClicked() {
    // Mark componentFormGroup controls as touched
    ComponentReactiveFormHelpers.validateFormGroupFields(this.formgroup);
    // Check if the formGroup is valid
    if (!this.formgroup.valid) {
      Log('Form contains validation errors');
      return;
    }

    if (this.selected?.id) {
      // Publish edit event
      // Fire formSubmitted event with the formGroup value
      this.formSubmittedEvent.emit({...(this.formgroup.getRawValue()), id: this.selected?.id});
    } else {
      // Publish create event
      // Fire formSubmitted event with the formGroup value
      this.formSubmittedEvent.emit(this.formgroup.getRawValue());
    }
  }

  onDgRefresh = (state: ClrDatagridStateInterface = null) => this._datagridState$.next(mapPaginatorStateWith([])(state || this.initialGridState));

  ngOnDestroy(): void {
    this._destroy$.next(); ``
  }

}
