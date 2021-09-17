import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DynamicControlParser } from "src/app/lib/core/helpers/dynamic-control-parser";
import { TypeUtilHelper } from "src/app/lib/core/helpers/type-utils-helper";
import { isDefined } from "src/app/lib/core/utils";
import { RolesProvider } from "src/app/lib/core/auth/core/providers/role";
import { DrewlabsRessourceServerClient } from "src/app/lib/core/http/core/ressource-server-client";
import {
  map,
  tap,
  takeUntil,
  filter,
  mergeMap,
  withLatestFrom,
} from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  getRoleUsingID,
  resetRolesCacheAction,
  roleCreatedAction,
  roleUpdatedAction,
} from "src/app/lib/core/auth/core/actions/roles";
import { createStateful, createSubject } from "src/app/lib/core/rxjs/helpers";
import {
  createRoleAction,
  updateRoleAction,
} from "src/app/lib/core/auth/core/actions/roles";
import { combineLatest, from } from "rxjs";
import { loadFormUsingIDAction } from "src/app/lib/core/components/dynamic-inputs/core/v2/actions/form";
import { onErrorAction } from "src/app/lib/core/rxjs/state/rx-state";
import {
  DynamicFormHelpers,
  sortformbyindex,
} from "src/app/lib/core/components/dynamic-inputs/core/helpers";
import { doLog } from "src/app/lib/core/rxjs/operators";
import { DynamicFormInterface } from "src/app/lib/core/components/dynamic-inputs/core/compact";
import { httpServerHost } from "src/app/lib/core/utils/url/url";
import { ComponentReactiveFormHelpers } from "src/app/lib/core/components/dynamic-inputs/angular";
import { UIStateStatusCode } from "src/app/lib/core/contracts/ui-state";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { TranslationService } from "src/app/lib/core/translator";
import { AbstractDynamicFormService } from "src/app/lib/core/components/dynamic-inputs/angular/services";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styles: [],
})
export class AddRoleComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();
  // Translation values loaded from the translation sources
  translations$ = this.translate
    .translate([
      "invalidRequestParams",
      "serverRequestFailed",
      "successfulRequest",
    ])
    .pipe(
      doLog("Translation values "),
      takeUntil(this._destroy$),
      map((state) => state)
    );
  // tslint:disable-next-line: variable-name
  _buildComponentForm$ =
    createStateful<{ form: DynamicFormInterface; selectedID: number | string }>(
      null
    );
  componentFormState$ = this._buildComponentForm$.pipe(
    doLog("Add role Form state: "),
    filter((source) => isDefined(source)),
    mergeMap((state) =>
      from(DynamicFormHelpers.buildDynamicForm(state.form)).pipe(
        map((form) => {
          const formgroup = this.controlParser.buildFormGroupFromDynamicForm(
            form
          ) as FormGroup;
          return {
            form: sortformbyindex(form),
            formgroup,
            selectedID: state.selectedID,
          };
        })
      )
    ),
    tap(() => this.uiState.endAction())
  );
  // tslint:disable-next-line: variable-name
  _formState$ = this.forms.state$.pipe(
    map((state) =>
      (state.collections
        ? Object.values(state.collections.items || {})
        : []
      ).find((form) => +form.id === environment.forms.roles)
    ),
    withLatestFrom(
      this.route.paramMap.pipe(
        takeUntil(this._destroy$),
        map((params) => {
          if (params.has("id")) {
            getRoleUsingID(this.roles.store$)(
              this.client,
              `${httpServerHost(this.host)}/${this.path}`,
              params.get("id")
            );
          }
          return params.get("id");
        })
      )
    ),
    doLog("Form with selected role id: "),
    // tslint:disable-next-line: variable-name
    map(([state, role_id]) => ({
      state,
      role_id,
    })),
    filter((source) => isDefined(source.state)),
    tap((source) => {
      const previousComponentFormGroup = this._buildComponentForm$.getValue();
      if (!isDefined(previousComponentFormGroup)) {
        this._buildComponentForm$.next({
          form: source.state,
          selectedID: source.role_id,
        });
      }
    })
  );
  rolesState$ = this.roles.state$.pipe(
    doLog("Roles state loaded: "),
    tap((state) => {
      if (state.performingAction) {
        this.uiState.startAction();
      }
    })
  );
  // Component view state
  state$ = combineLatest([
    this.componentFormState$,
    this.rolesState$,
    this.translations$,
    this.uiState.uiState,
  ]).pipe(
    map(([formState, state, translations, uiState]) => ({
      ...formState,
      createdRole: state.createdRole,
      performingAction: uiState.performingAction,
      updateResult: state.updateResult,
      translations,
    })),
    map((state) => {
      if (state.createdRole) {
        this.uiState.endAction(
          state.translations.successfulRequest,
          UIStateStatusCode.STATUS_CREATED
        );
        if (this.typeHelper.isDefined(state.formgroup)) {
          state.formgroup.reset();
        }
        // Makes the createdRole null after the user was notified
        setTimeout(() => {
          roleCreatedAction(this.roles.store$)(null);
          this.uiState.endAction();
        }, 1000);
      }

      if (state.updateResult === true) {
        this.uiState.endAction(
          state.translations.successfulRequest,
          UIStateStatusCode.STATUS_OK
        );
        // Makes the createdRole null after the user was notified
        setTimeout(() => {
          roleUpdatedAction(this.roles.store$)(null);
          this.uiState.endAction();
        }, 1000);
      }
      // handle Error cases
      return { ...state };
    })
  );

  constructor(
    private uiState: AppUIStateProvider,
    private route: ActivatedRoute,
    private controlParser: DynamicControlParser,
    public readonly typeHelper: TypeUtilHelper,
    public roles: RolesProvider,
    public forms: AbstractDynamicFormService,
    public client: DrewlabsRessourceServerClient,
    private translate: TranslationService,
    @Inject("AUTH_ROLES_RESOURCE_PATH") private path: string,
    @Inject("AUTH_SERVER_HOST") private host: string
  ) {
    this.uiState.startAction();
    this._formState$.pipe(takeUntil(this._destroy$)).subscribe();
  }

  ngOnInit() {
    loadFormUsingIDAction(this.forms.store$)(
      this.client,
      "forms",
      environment.forms.roles
    );
  }

  onNavigateBack(): void {}

  onFormSubmittedEvent({
    formgroup,
    url,
    selected,
  }: {
    formgroup: FormGroup;
    url: string;
    selected?: number | string;
  }) {
    if (isDefined(selected)) {
      return this.onEditFormSumit(formgroup, url, selected);
    }
    return this.onFormSubmit(formgroup, url);
  }

  async onFormSubmit(formgroup: FormGroup, url: string) {
    ComponentReactiveFormHelpers.validateFormGroupFields(formgroup);
    if (formgroup.valid) {
      createRoleAction(this.roles.store$)(
        this.client,
        url,
        formgroup.getRawValue()
      );
    }
  }

  async onEditFormSumit(
    formgroup: FormGroup,
    url: string,
    id: number | string
  ) {
    ComponentReactiveFormHelpers.validateFormGroupFields(formgroup);
    if (formgroup.valid) {
      const requestBody = Object.assign(formgroup.getRawValue());
      updateRoleAction(this.roles.store$)(this.client, url, id, requestBody);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    onErrorAction(this.roles.store$)(null);
    resetRolesCacheAction(this.roles.store$)();
  }
}
