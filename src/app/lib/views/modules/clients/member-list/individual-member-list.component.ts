import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef
} from "@angular/core";
import { Router } from "@angular/router";
import { AzlCachePipe } from "@azlabsjs/ngx-azl-cache";
import {
  GridColumnType,
  PaginateResult,
  ProjectPaginateQueryParamType
} from "@azlabsjs/ngx-clr-smart-grid";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { useQuery } from "@azlabsjs/ngx-query";
import { getHttpHost } from "@azlabsjs/requests";
import { map, mergeMap, Observable, startWith, Subject } from "rxjs";
import { configsDbNames } from "src/app/lib/bloc";
import { environment } from "src/environments/environment";
import { defaultPaginateQuery } from "../datagrid";
import { GridDataQueryProvider } from "../datagrid/grid-data.query.service";
import { clientsDbConfigs } from "../db.slice.factory";
import { IndividualClient, IndividualClientType } from "../types";

@Component({
  selector: "app-individual-member-list",
  template: `
    <ngx-clr-smart-grid
      [pageResult]="state$ | async"
      [config]="{
        sizeOptions: [10, 50, 100, 150],
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
export class IndividualMemberListComponent {
  // #region Component input
  @Input() overflowTemplate!: TemplateRef<any>;
  @Input() actionBarTemplate!: TemplateRef<any>;
  @Input() createRoute!: string;
  @Input() columns: GridColumnType[] = [
    {
      title: "N° membre",
      label: "number",
    },
    {
      title: "Date Ouv.",
      label: "validatedAt",
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
      title: "Lien d'affaires",
      label: "businesslink",
      // transform: createPipeTransform(this.pipe, configsDbNames.businesslinks),
      transform: `azlcache:${configsDbNames.businesslinks}`,
    },
    {
      title: "Type",
      label: "type",
      // transform: createPipeTransform(this.pipe, clientsDbConfigs.categories),
      transform: `azlcache:${clientsDbConfigs.categories}`,
    },
    {
      title: "Téléphone",
      label: "phonenumber",
    },
    {
      title: "Civilité",
      label: "civility",
      // transform: createPipeTransform(this.pipe, configsDbNames.civilstates),
      transform: `azlcache:${configsDbNames.civilstates}`,
    },
    {
      title: "Activité",
      label: "activity",
    },
    {
      title: "Statut",
      label: "status",
      // transform: createPipeTransform(this.pipe, clientsDbConfigs.status),
      transform: `azlcache:${clientsDbConfigs.status}`,
    },
  ];
  // #endregion Component input

  // #region Component outputs
  @Output() create = new EventEmitter<Event>();
  // #endregion Component outputs

  // #region Component internal properties
  private _dgChanges$ = new Subject<ProjectPaginateQueryParamType>();
  @Input() requestPath!: string;
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
              "api.clients.endpoints.individuals",
              environment.api.clients.endpoints.individuals
            )}`,
          query,
          [],
          ["*", "member", "by.address"],
          []
        ) as Observable<PaginateResult<unknown>>
    ),
    map(
      (result) =>
        ({
          ...result,
          data:
            result?.data
              .map((item) => IndividualClient.safeParse(item).data)
              .filter((item) => typeof item !== "undefined" && item !== null) ??
            [],
        } as Required<PaginateResult<IndividualClientType>>)
    )
    // TODO: If possible, use a redux or flux store to share
    // data between components
  );
  // #endregion Component internal properties

  // Creates an instance of the current component
  constructor(
    private router: Router,
    private queryProvider: GridDataQueryProvider,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager,
    private pipe: AzlCachePipe
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
