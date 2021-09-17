import { Component, ViewChild, OnDestroy, Inject } from "@angular/core";
import { ClrDatagrid, ClrDatagridStateInterface } from "@clr/angular";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { mapPaginatorStateWith } from "src/app/lib/core/pagination/helpers";
import { createSubject, observableOf } from "src/app/lib/core/rxjs/helpers";
import {
  onPaginateFormsAction,
  selectFormAction,
} from "src/app/lib/core/components/dynamic-inputs/core/v2/actions";
import { DrewlabsRessourceServerClient } from "../../../../../core/http/core/ressource-server-client";
import { doLog } from "src/app/lib/core/rxjs/operators";
import { partialConfigs } from "src/app/lib/views/partials/partials-configs";
import { FormV2 } from "../../../../../core/components/dynamic-inputs/core/v2/models/form";
import { httpServerHost } from "src/app/lib/core/utils/url/url";
import { environment } from "src/environments/environment";
import { AppUIStateProvider } from "src/app/lib/core/ui-state";
import { AbstractDynamicFormService } from "src/app/lib/core/components/dynamic-inputs/angular/services";
import { isDefined } from "src/app/lib/core/utils";
import { writeStream } from "src/app/lib/core/utils/io";

@Component({
  selector: "app-listforms",
  templateUrl: "./listforms.component.html",
  styles: [
    `
      .app-content-container {
        padding: 0 16px;
      }
    `,
  ],
})
export class ListformsComponent implements OnDestroy {
  // Selected values
  public selectedValues: { [index: string]: any }[] = [];
  // Dashboard navigation route
  dashboardHomeRoute = `/${partialConfigs.routes.commonRoutes.dashboardHomeRoute}`;
  initialGridState = { page: 1, per_page: 20 };
  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject<{}>();
  state$ = this.provider.state$.pipe(
    takeUntil(this._destroy$),
    map((state) => ({
      dataSource: state.collections,
      performingAction: state.performingAction,
    })),
    doLog("Forms data source: ")
  );

  // tslint:disable-next-line: variable-name
  private _datagridState$ = createSubject<ClrDatagridStateInterface | any>();
  gridState$ = this._datagridState$.pipe(startWith(this.initialGridState));

  // tslint:disable-next-line: variable-name
  formsDatagridState$ = this.gridState$
    .pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((state: ClrDatagridStateInterface) => observableOf(state)),
      shareReplay(1)
    )
    .pipe(
      map((state) => {
        onPaginateFormsAction(this.provider.store$)(
          this.client,
          `${httpServerHost(this.host)}/${this.path}`,
          state
        );
      }),
      doLog("Forms Datagrid state: ")
    );

  @ViewChild("clrDataGrid", { static: false }) dataGrid: ClrDatagrid;

  constructor(
    private provider: AbstractDynamicFormService,
    private client: DrewlabsRessourceServerClient,
    private router: Router,
    @Inject("FORM_RESOURCES_PATH") private path: string,
    @Inject("FORM_SERVER_HOST") private host: string,
    private _uiState: AppUIStateProvider
  ) {
    this.formsDatagridState$.subscribe();
  }

  // tslint:disable-next-line: typedef
  navigateToEditView(item: FormV2) {
    const appRoutes = environment?.appRoutes;
    selectFormAction(this.provider.store$)(item.id);
    this.router.navigate([
      `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes?.managementsRoute}/${appRoutes?.createFormsRoute}`,
      item.id,
    ]);
  }

  onDgHeaderRefresh = () => {
    this._datagridState$.next(this.initialGridState);
  };

  // tslint:disable-next-line: typedef
  navigateToCreateFormView() {
    const appRoutes = environment?.appRoutes;
    this.router.navigateByUrl(
      `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${appRoutes?.managementsRoute}/${appRoutes?.createFormsRoute}`
    );
  }

  onDgRefresh = (state: ClrDatagridStateInterface) =>
    this._datagridState$.next(mapPaginatorStateWith([])(state));

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  async onExportToExcelEvent() {
    this._uiState.startAction();
    await this.provider
      .getAll({
        _query: JSON.stringify({
          whereIn: [
            "id",
            this.selectedValues
              .filter((value) => isDefined(value?.id))
              .map((value) => value?.id),
          ],
        }),
        with_controls: true,
      })
      .pipe(
        tap(async (values) => {
          await writeStream(JSON.stringify(values), "jsonforms.json");
        })
      )
      .toPromise();
    this.selectedValues = [];
    this._uiState.endAction();
  }
}
