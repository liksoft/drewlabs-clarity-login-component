import { Component, ViewChild, OnDestroy, Input, Inject } from "@angular/core";
import { ClrDatagrid, ClrDatagridStateInterface } from "@clr/angular";
import { TypeUtilHelper } from "src/app/lib/core/helpers/type-utils-helper";
import { ModulesProvider } from "../../../partials/app-modules/core/v2/providers/module";
import { Router } from "@angular/router";
import { mapPaginatorStateWith } from "src/app/lib/core/pagination/helpers";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from "rxjs/operators";
import { createSubject, observableOf } from "src/app/lib/core/rxjs/helpers";
import { doLog } from "src/app/lib/core/rxjs/operators";
import { DrewlabsRessourceServerClient } from "src/app/lib/core/http/core";
import { partialConfigs } from "../../../partials/partials-configs";
import { RoleV2 } from "src/app/lib/core/auth/contracts/v2/authorizations/role";
import { Dialog } from "../../../../core/utils/browser/window-ref";
import { environment } from "src/environments/environment";
import {
  MODULES_API_SERVER_PATH,
  paginateModuleAction,
  deleteModuleAction,
} from "src/app/lib/views/partials/app-modules/core";

@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styles: [
    `
      .app-content-container {
        padding: 0 16px;
      }
    `,
  ],
})
export class ModulesComponent implements OnDestroy {
  @Input() ressourcesPath: string;
  @Input() ressourcesJsonKey: string;
  @Input() regimeID: number | string;
  @ViewChild("clrDataGrid", { static: true }) dataGrid: ClrDatagrid;

  initialGridState = { page: 1, per_page: 10 };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();
  state$ = this.modules.state$.pipe(
    map((state) => ({
      dataSource: state.pagination,
      performingAction: state.performingAction,
    })),
    doLog("Users pagination data source: ")
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();

  // tslint:disable-next-line: variable-name
  gridState$ = this._datagridState$
    .pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state))
    )
    .pipe(
      map((state) => {
        paginateModuleAction(this.modules.store$)(
          this.client,
          this.path,
          state
        );
      })
    );

  constructor(
    private modules: ModulesProvider,
    private router: Router,
    private client: DrewlabsRessourceServerClient,
    public readonly typeHelper: TypeUtilHelper,
    private dialog: Dialog,
    @Inject(MODULES_API_SERVER_PATH) private path?: string
  ) {
    this.gridState$.subscribe();
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  };

  onDgRefresh = (state: ClrDatagridStateInterface) =>
    this._datagridState$.next(mapPaginatorStateWith([])(state));

  handleDeleteEvent = async (id: number | string, translations: any) => {
    if (this.dialog.confirm(translations.prompt)) {
      deleteModuleAction(this.modules.store$)(this.client, this.path, id);
    }
  };

  handleItemSelectEvent = async (id: number | string) => {
    const appRoutes = environment?.appRoutes;
    // Navigate to edit view
    this.router.navigateByUrl(
      `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes.managementsRoute}/${appRoutes.updateModulesRoute}/${id}`
    );
  };

  handleCreateEvent() {
    const appRoutes = environment?.appRoutes;
    // Navigate to create view
    this.router.navigateByUrl(
      `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes.managementsRoute}/${appRoutes.createModulesRoute}`
    );
  }

  ngOnDestroy = () => this._destroy$.next();

  /**
   * @description Convert a list of module roles to string
   * @param roles [[Role[]]]
   */
  transformListOfModuleRolesToString(roles: RoleV2[]): string {
    if (!this.typeHelper.isDefined(roles)) {
      return "";
    }
    return roles.map((r) => r.label).join(", ");
  }
}
