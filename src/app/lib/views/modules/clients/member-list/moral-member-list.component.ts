import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef
} from "@angular/core";
import { Router } from "@angular/router";
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
import { configsDbNames } from "src/app/lib/bloc";
import { environment } from "src/environments/environment";
import { UIStateProvider, UI_STATE_PROVIDER } from "../../../partials/ui-state";
import { defaultPaginateQuery } from "../datagrid";
import { GridDataQueryProvider } from "../datagrid/grid-data.query.service";
import { clientsDbConfigs } from "../db.slice.factory";
import { Member, MoralMember, MoralMemberType } from "../types";

@Component({
  selector: "app-moral-member-list",
  template: `
    <ngx-clr-smart-grid
      [pageResult]="state$ | async"
      [config]="{
        sizeOptions: [20, 50, 100, 150],
        pageSize: 20,
        hasActionOverflow: true,
        hasExpandableRows: false,
        hasDetails: true
      }"
      [columns]="columns"
      [loading]="(uistate$ | async)?.performingAction ?? false"
    >
      <!-- Action Bar -->
      <ng-template #dgActionBar let-selected>
        <ng-container
          *ngTemplateOutlet="
            actionBarTemplate;
            context: { $implicit: selected }
          "
        ></ng-container>
      </ng-template>
      <!-- Action Bar -->
      <!-- Expanded row -->
      <!-- <ng-template #dgRowDetail let-item>
        <ng-container
          *ngTemplateOutlet="expandedRowTemplate; context: { $implicit: item }"
        ></ng-container>
      </ng-template> -->
      <!-- Expanded row -->
      <!-- Dg Details pane body -->
      <ng-template #dgDetailBody let-item>
        <ng-container
          *ngTemplateOutlet="
            detailPaneRef;
            context: {
              $implicit: item,
              address: item.address,
              personal: item.personal,
              member: projectMember(item)
            }
          "
        ></ng-container>
      </ng-template>
      <!-- Dg Details pane body -->
      <!-- Action overflow -->
      <ng-template #dgActionOverflow let-item>
        <ng-container
          *ngTemplateOutlet="
            overflowTemplate;
            context: { $implicit: item }
          "
        ></ng-container>
      </ng-template>
      <!-- Action overflow -->
    </ngx-clr-smart-grid>
  `,
  styles: [],
  providers: [GridDataQueryProvider],
})
export class MoralMemberListComponent {
  //#region Component inputs
  @Input() overflowTemplate!: TemplateRef<any>;
  @Input() actionBarTemplate!: TemplateRef<any>;
  @Input() expandedRowTemplate!: TemplateRef<any>;
  @Input() columns: GridColumnType[] = [
    {
      title: "N° membre",
      label: "accountNumber",
    },
    {
      title: "Régistre du commerce",
      label: "registrynumber",
    },
    {
      title: "Raison sociale",
      label: "label",
      transform: "uppercase",
    },
    {
      title: "Téléphone",
      label: "phonenumber",
    },
    {
      title: "Type",
      label: "type",
      transform: `azlcache:${clientsDbConfigs.categories}`,
    },
    {
      title: "Secteur activité",
      label: "activitysector",
      transform: `azlcache:${configsDbNames.activitysectors}`,
    },
    {
      title: "Activité",
      label: "activity",
    },
    {
      title: "Statut",
      label: "status",
      transform: `azlcache:${clientsDbConfigs.status}`,
    },
  ];
  @Input() requestPath!: string;
  @Input("detailPane") detailPaneRef!: TemplateRef<any>;
  //#endregion Component inputs

  // #region Component outputs
  @Output() create = new EventEmitter<Event>();
  // #endregion Component outputs

  // #region Component internal properties
  private _dgChanges$ = new Subject<ProjectPaginateQueryParamType>();
  state$ = this._dgChanges$.pipe(
    startWith(defaultPaginateQuery),
    tap(() => this.uistate.startAction()),
    mergeMap(
      (query) =>
        useQuery(
          this.queryProvider,
          this.requestPath ??
            `${getHttpHost(
              this.config.get("api.clients.host", environment.api.clients.host)
            )}/${this.config.get(
              "api.clients.endpoints.morals",
              environment.api.clients.endpoints.morals
            )}`,
          query,
          [],
          ["*", "member", "address"],
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
              .map((item) => MoralMember.safeParse(item).data)
              .filter((item) => typeof item !== "undefined" && item !== null) ??
            [],
        } as Required<PaginateResult<MoralMemberType>>)
    ),
    catchError((error) => {
      this.uistate.endAction();
      return throwError(() => error);
    })
  );

  uistate$ = this.uistate.uiState;
  // #endregion Component internal properties

  // Creates an instance of the current component
  constructor(
    private router: Router,
    private queryProvider: GridDataQueryProvider,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager,
    @Inject(UI_STATE_PROVIDER) private uistate: UIStateProvider
  ) {}

  projectMember(value: MoralMemberType) {
    return Member.safeParse({
      id: value.memberid,
      validatedAt: value.validatedAt,
      status: value.status,
      activity: value.activity,
      type: value.type,
      accountNumber: value.accountNumber,
      label: value.label,
      businesslink: value.businesslink,
      address: value.address,
    }).data;
  }
}
