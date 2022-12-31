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
import { map, mergeMap, Observable, startWith, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { defaultPaginateQuery } from "../datagrid";
import { GridDataQueryProvider } from "../datagrid/grid-data.query.service";
import { MoralClient, MoralClientType } from "../types";

@Component({
  selector: "app-moral-member-list",
  template: `
    <ngx-clr-smart-grid
      [data]="(state$ | async)?.data ?? []"
      [config]="{
        sizeOptions: [20, 50, 100, 150],
        pageSize: 5
      }"
      [columns]="columns"
    >
      <!-- Action Bar -->
      <ng-template #dgActionBar let-selected>
        <ng-container
          *ngTemplateOutlet="
            actionBarTemplate;
            context: {
              selected: this.selected,
              create: dgOnCreate.bind(this),
              refresh: dgOnRefresh.bind(this)
            }
          "
        ></ng-container>
      </ng-template>
      <!-- Action Bar -->
      <!-- Action overflow -->
      <ng-template #dgActionOverflow let-item>
        <ng-container
          *ngTemplateOutlet="overflowTemplate; context: { item: this.item }"
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
  @Input() createRoute!: string;
  @Input() columns: GridColumnType[] = [
    {
      title: "N° membre",
      label: "member_id",
    },
    {
      title: "Régistre du commerce",
      label: "",
    },
    {
      title: "Raison sociale",
      label: "socialReason",
      transform: "uppercase",
    },
    {
      title: "Secteur activité",
      label: "activitySector.label",
    },
    {
      title: "Type",
      label: "memberType.label",
    },
    {
      title: "Téléphone",
      label: "address.phoneNumber",
    },
    {
      title: "Statut",
      label: "status",
    },
  ];
  @Input() requestPath!: string;
  //#endregion Component inputs

  // #region Component outputs
  @Output() create = new EventEmitter<Event>();
  // #endregion Component outputs

  // #region Component internal properties
  private _dgChanges$ = new Subject<ProjectPaginateQueryParamType>();
  state$ = this._dgChanges$.pipe(
    startWith(defaultPaginateQuery),
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
    map(
      (result) =>
        ({
          ...result,
          data: result?.data
            .map((item) => MoralClient.safeParse(item).data)
            .filter((item) => typeof item !== "undefined" && item !== null) ?? [],
        } as Required<PaginateResult<MoralClientType>>)
    ),
    tap(console.log)
    // TODO: If possible, use a redux or flux store to share
    // data between components
  );
  // #endregion Component internal properties

  // Creates an instance of the current component
  constructor(
    private router: Router,
    private queryProvider: GridDataQueryProvider,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {
    // Subscribe to the state to test the result
    this.state$.subscribe();
  }

  dgOnCreate(event: Event) {
    this.create.emit(event);
  }

  dgOnRefresh(event: ProjectPaginateQueryParamType) {
    this._dgChanges$.next(event);
  }
}
