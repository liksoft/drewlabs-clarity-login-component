import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  TemplateRef
} from "@angular/core";
import {
  GridColumnType,
  PaginateResult,
  ProjectPaginateQueryParamType
} from "@azlabsjs/ngx-clr-smart-grid";
import { useQuery } from "@azlabsjs/ngx-query";
import {
  catchError,
  map,
  mergeMap,
  Observable,
  startWith,
  Subject,
  tap,
  throwError
} from "rxjs";
import {
  UIStateProvider,
  UI_STATE_PROVIDER
} from "src/app/lib/views/partials/ui-state";
import { GridDataQueryProvider } from "./datagrid.query.service";
import { defaultPaginateQuery } from "./defaults";
import { RestQueryType } from "./types";

@Component({
  selector: "ngx-datagrid",
  templateUrl: "./datagrid.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridComponent implements OnDestroy {
  // #region Component inputs
  @Input("page-size-options") sizeOptions = [20, 50, 100, 150];
  @Input("page-size") pageSize = 20;
  @Input("detail-pane") detailPaneRef!: TemplateRef<any>;
  @Input("loading-text") loadingtext = "Loading data, please wait ...";
  @Input() placeholder = "We couldn't find any data!";
  @Input() overflowTemplate!: TemplateRef<any>;
  @Input() actionBarTemplate!: TemplateRef<any>;
  @Input() url!: string;
  @Input() columns: GridColumnType[] = [];
  @Input() query: RestQueryType = {};
  @Input() filters: { property: string; value: unknown }[] = [];
  @Input() projectResult: (item: any) => { [k: string]: any } | undefined = (
    item
  ) => item;
  @Input() loading!: boolean;
  // #endregion Component inputs

  // #region Component outputs
  // #endregion Component outputs

  // #region Component properties / states
  private _dgChanges$ = new Subject<ProjectPaginateQueryParamType>();
  state$ = this._dgChanges$.pipe(
    startWith(defaultPaginateQuery),
    tap(() => {
      this.uistate.startAction();
      this._placeholder$.next(this.loadingtext);
    }),
    map((query) => ({
      ...query,
      filters: [
        ...(this.query?._filters ?? []),
        ...this.filters,
        ...(query?.filters ?? []),
      ],
    })),
    mergeMap(
      (query) =>
        useQuery(
          this.queryProvider,
          this.url,
          query,
          [],
          this.query?._columns ?? ["*"],
          this.query?._excepts ?? []
        ) as Observable<PaginateResult<unknown>>
    ),
    tap(() => this.uistate.endAction()),
    map(
      (result) =>
        ({
          ...result,
          data:
            result?.data
              .map(this.projectResult)
              .filter((item) => typeof item !== "undefined" && item !== null) ??
            [],
        } as Required<PaginateResult<{ [k: string]: any }>>)
    ),
    tap((state) =>
      this._placeholder$.next(
        state.total && state.total === 0 ? this.placeholder : ""
      )
    ),
    catchError((error) => {
      this.uistate.endAction();
      return throwError(() => error);
    })
  );
  get overflow() {
    return (
      typeof this.overflowTemplate !== "undefined" &&
      this.overflowTemplate !== null
    );
  }
  get detailed() {
    return (
      typeof this.detailPaneRef !== "undefined" && this.detailPaneRef !== null
    );
  }
  uistate$ = this.uistate.uiState;
  _placeholder$ = new Subject<string>();
  placeholder$ = this._placeholder$.asObservable();
  // #endregion Component properties / states

  /**
   * Creates an angular component instance
   */
  constructor(
    @Inject(UI_STATE_PROVIDER) private uistate: UIStateProvider,
    private queryProvider: GridDataQueryProvider
  ) {}

  // Listen for datagrid refresh event
  dgRefreshListener(event: ProjectPaginateQueryParamType) {
    this._dgChanges$.next(event);
  }

  //
  ngOnDestroy(): void {
    // TODO: Do referenced resource cleanup
  }
}
