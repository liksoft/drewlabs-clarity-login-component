import { Component, Inject, Input, TemplateRef } from "@angular/core";
import {
  GridColumnType,
  PaginateResult,
  ProjectPaginateQueryParamType
} from "@azlabsjs/ngx-clr-smart-grid";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { useQuery } from "@azlabsjs/ngx-query";
import { getHttpHost } from "@azlabsjs/requests";
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
import { environment } from "src/environments/environment";
import { defaultPaginateQuery } from "../../datagrid";
import { GridDataQueryProvider } from "../../datagrid/grid-data.query.service";
import { StakeHolder, StakeHolderType } from "../../types";

@Component({
  selector: "app-stake-holders-list",
  templateUrl: "./stake-holders-list.component.html",
})
export class StakeHoldersListComponent {
  // #region Component inputs
  @Input() overflowTemplate!: TemplateRef<any>;
  @Input() actionBarTemplate!: TemplateRef<any>;
  @Input() member!: string | number;
  @Input() membernumber!: string | number;
  @Input() requestPath!: string;
  @Input("has-loading") hasLoading: boolean = true;
  @Input() representative: boolean = false;
  // #endregion Component inputs

  // #region Component outputs
  // #endregion Component outputs

  // #region Component properties
  private _dgChanges$ = new Subject<ProjectPaginateQueryParamType>();
  state$ = this._dgChanges$.pipe(
    startWith(defaultPaginateQuery),
    tap(() => this.uistate.startAction()),
    map((query) => ({
      ...query,
      filters: [
        // Add member_id filters to query filters
        ...(query?.filters ?? []),
        ...(this.member ? [{ property: "member_id", value: this.member }] : []),
      ],
    })),
    tap(console.log),
    mergeMap(
      (query) =>
        useQuery(
          this.queryProvider,
          this.requestPath ??
            `${getHttpHost(
              this.config.get("api.clients.host", environment.api.clients.host)
            )}/${this.config.get(
              "api.clients.endpoints.stakeholders",
              environment.api.clients.endpoints.stakeholders
            )}`,
          query,
          [],
          ["*", "customer.address"],
          []
        ) as Observable<PaginateResult<unknown>>
    ),
    tap(() => this.uistate.endAction()),
    map(
      (result) =>
        ({
          ...result,
          data:
            result?.data
              .map((item) => {
                const result = StakeHolder.safeParse(item).data;
                return result
                  ? { ...result, membernumber: this.membernumber }
                  : result;
              })
              .filter((item) => typeof item !== "undefined" && item !== null) ??
            [],
        } as Required<PaginateResult<StakeHolderType>>)
    ),
    catchError((error) => {
      this.uistate.endAction();
      return throwError(() => error);
    })
  );
  @Input() columns: GridColumnType[] = [
    {
      title: "ID",
      label: "id",
    },
    {
      title: "N° membre",
      label: "number",
    },
    {
      title: "N° compte",
      label: "accountnumber",
    },
    {
      title: "Date Enr.",
      label: "createdAt",
      transform: "date",
    },
    {
      title: "Nom",
      label: "lastname",
      transform: "uppercase",
    },
    {
      title: "Prénoms",
      label: "firstname",
      transform: "uppercase",
    },
    {
      title: "Téléphone",
      label: "contact",
    },
  ];
  uistate$ = this.uistate.uiState;
  // #region Component properties

  constructor(
    @Inject(UI_STATE_PROVIDER) private uistate: UIStateProvider,
    private queryProvider: GridDataQueryProvider,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}
}
