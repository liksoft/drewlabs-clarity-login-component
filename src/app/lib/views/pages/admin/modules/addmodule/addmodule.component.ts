import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, takeUntil, delay, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { IDynamicForm, IHTMLFormControl, SelectInput, CheckBoxInput } from 'src/app/lib/core/components/dynamic-inputs/core';
import { DynamicControlParser } from 'src/app/lib/core/helpers/dynamic-control-parser';
import { TypeUtilHelper } from 'src/app/lib/core/helpers/type-utils-helper';
import { TranslationService } from 'src/app/lib/core/translator';
import { getJSObjectPropertyValue } from 'src/app/lib/core/utils';
import { moduleFormViewModelBindings, ModuleV2 } from '../../../../partials/app-modules/core/v2/models/module';
import { createModuleAction, updateModuleAction, moduleCreatedAction, moduleUpdatedAction, getModuleUsingID } from '../../../../partials/app-modules/core/v2/actions/module';
import { ModulesProvider } from '../../../../partials/app-modules/core/v2/providers/module';
import { DrewlabsRessourceServerClient } from '../../../../../core/http/core/ressource-server-client';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UIStateStatusCode } from 'src/app/lib/core/contracts/ui-state';
import { AppUIStateProvider } from 'src/app/lib/core/ui-state';
import { ComponentReactiveFormHelpers } from 'src/app/lib/core/components/dynamic-inputs/angular';
import { MODULE_RESOURCE_PATH_TOKEN } from 'src/app/lib/views/partials/app-modules/core';

@Component({
  selector: 'app-addmodule',
  templateUrl: './addmodule.component.html',
  styles: []
})
export class AddmoduleComponent implements OnInit, OnDestroy {

  public form: IDynamicForm;
  public componentFormGroup: FormGroup;
  public selectedModule: ModuleV2;
  public publishers: Subject<any>[] = [];
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();
  translations$ = this.translate.translate([
    'invalidRequestParams',
    'serverRequestFailed',
    'successfulRequest'
  ]).pipe(
    takeUntil(this._destroy$)
  );

  selectedModule$ = this.route.paramMap.pipe(
    takeUntil(this._destroy$),
    map(params => {
      if (params.has('id')) {
        getModuleUsingID(this.modules.store$)(
          this.client,
          this.path,
          params.get('id')
        );
      }
      return +params.get('id');
    }),
  );

  state$ = combineLatest([
    this.modules.state$,
    this.translations$])
    .pipe(
      takeUntil(this._destroy$),
      map(([state, translations]) => {
        if (state.createdModule) {
          this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_CREATED);
          if (this.typeHelper.isDefined(this.componentFormGroup)) {
            this.componentFormGroup.reset();
          }
          // Makes the createdRole null after the user was notified
          setTimeout(() => {
            moduleCreatedAction(this.modules.store$)(null);
            this.uiState.endAction();
          }, 2000);
        }

        if (state.updateResult === true) {
          this.uiState.endAction(translations.successfulRequest, UIStateStatusCode.STATUS_OK);
          // Makes the createdRole null after the user was notified
          setTimeout(() => {
            moduleUpdatedAction(this.modules.store$)(null);
            this.uiState.endAction();
          }, 2000);
        }
      })
    );

  formViewState$ = combineLatest([
    this.modules.state$,
    this.selectedModule$,
  ])
    .pipe(
      delay(.3),
      map(([moduleState, moduleID]) => ({
        performingAction: moduleState.performingAction,
        selectedModule: moduleState.items.find((item) => item.id === moduleID),
        items: moduleState.items
      }),
      ),
      tap(state => {
        this.selectedModule = state.selectedModule || this.selectedModule;
        // TODO : Build and prefill the form
      }));

  performingAction$ = combineLatest([this.uiState.uiState, this.formViewState$]).pipe(
    map(([state, formViewState]) => ({ performingAction: state.performingAction || formViewState.performingAction }))
  );

  constructor(
    private controlParser: DynamicControlParser,
    public readonly typeHelper: TypeUtilHelper,
    private translate: TranslationService,
    private modules: ModulesProvider,
    private client: DrewlabsRessourceServerClient,
    private uiState: AppUIStateProvider,
    private route: ActivatedRoute,
    @Inject(MODULE_RESOURCE_PATH_TOKEN) private path?: string
  ) {
    this.translations$.subscribe();
    this.performingAction$.subscribe();
    this.state$.subscribe();
  }

  async ngOnInit() {
    moduleCreatedAction(this.modules.store$)(false);
    moduleUpdatedAction(this.modules.store$)(false);
  }

  prefilForm() {
    if (this.selectedModule) {
      for (const [key, value] of Object.entries(moduleFormViewModelBindings())) {
        if (this.typeHelper.isDefined(this.componentFormGroup.get(key))) {
          if (key === 'roles') {
            const roleControl = (this.form.controlConfigs as IHTMLFormControl[])
              .find((cf) => cf.formControlName === 'roles') as SelectInput;
            if (roleControl && (roleControl instanceof SelectInput) && this.typeHelper.isDefined(this.selectedModule.roles)) {
              this.componentFormGroup.get(key).setValue(this.selectedModule.roles.map((r) => r.id));
            }
            continue;
          }
          this.componentFormGroup.get(key).setValue(getJSObjectPropertyValue(this.selectedModule, value));
        }
      }
    }
  }

  async onFormSubmit() {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      const obj = this.transformRequestBody(this.componentFormGroup.getRawValue());
      if (!this.typeHelper.isDefined(this.selectedModule)) {
        createModuleAction(this.modules.store$)(this.client, this.form.endpointURL, obj); // deserializeSerializedModule
      } else {
        updateModuleAction(this.modules.store$)(this.client, this.form.endpointURL, this.selectedModule.id, obj);
      }
    }
  }

  private transformRequestBody(body: object | any) {
    const roleControl = (this.form.controlConfigs as IHTMLFormControl[])
      .find((cf) => cf.formControlName === 'roles') as CheckBoxInput;
    if (roleControl && (roleControl instanceof CheckBoxInput) && this.typeHelper.isDefined(body.roles)) {
      body = Object.assign(body, {
        roles: roleControl.items.map((i, index) => {
          return (body.roles[index] === true) ? i.value : null;
        }).filter((i) => this.typeHelper.isDefined(i))
      });
    }
    return body;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this.uiState.endAction();
    moduleCreatedAction(this.modules.store$)(null);
    moduleUpdatedAction(this.modules.store$)(null);
  }

}
