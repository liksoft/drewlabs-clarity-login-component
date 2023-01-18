import { Component, Inject } from "@angular/core";
import { GridColumnType } from "@azlabsjs/ngx-clr-smart-grid";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { getHttpHost } from "@azlabsjs/requests";
import { environment } from "src/environments/environment";
import { RestQueryType } from "../../datagrid";
import { IndividualMember, MoralMember, StakeHolder } from "../types";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;
      }
    `,
  ],
})
export class MemberListComponent {
  morals = {
    url: `${getHttpHost(
      this.config.get("api.clients.host", environment.api.clients.host)
    )}/${this.config.get(
      "api.clients.endpoints.morals",
      environment.api.clients.endpoints.morals
    )}`,
    datagrid: {
      columns: this.config.get<GridColumnType[]>(
        "app.clients.morals.datagrid.columns",
        environment.app.clients.morals.datagrid.columns
      ),
      query: this.config.get<RestQueryType>(
        "app.clients.morals.datagrid.query",
        environment.app.clients.morals.datagrid.query
      ),
    },
    project: (item: any) => MoralMember.safeParse(item).data,
  };

  individuals = {
    url: `${getHttpHost(
      this.config.get("api.clients.host", environment.api.clients.host)
    )}/${this.config.get(
      "api.clients.endpoints.individuals",
      environment.api.clients.endpoints.individuals
    )}`,
    datagrid: {
      columns: this.config.get<GridColumnType[]>(
        "app.clients.individuals.datagrid.columns",
        environment.app.clients.individuals.datagrid.columns
      ),
      query: this.config.get<RestQueryType>(
        "app.clients.individuals.datagrid.query",
        environment.app.clients.individuals.datagrid.query
      ),
    },
    project: (item: any) => IndividualMember.safeParse(item).data,
  };

  stakeholders = {
    datagrid: {
      url: `${getHttpHost(
        this.config.get("api.clients.host", environment.api.clients.host)
      )}/${this.config.get(
        "api.clients.endpoints.stakeholders",
        environment.api.clients.endpoints.stakeholders
      )}`,
      columns: this.config.get<GridColumnType[]>(
        "app.clients.stakeholders.datagrid.columns",
        environment.app.clients.stakeholders.datagrid.columns
      ),
      queries: {
        beneficiaries: this.config.get<RestQueryType>(
          "app.clients.stakeholders.datagrid.queries.beneficiaries",
          environment.app.clients.stakeholders.datagrid.queries.beneficiaries
        ),
        representatives: this.config.get<RestQueryType>(
          "app.clients.stakeholders.datagrid.queries.representatives",
          environment.app.clients.stakeholders.datagrid.queries.representatives
        ),
      },
    },
    createProjectResult: (membernumber: string | number) => (item: any) => {
      const result = StakeHolder.safeParse(item).data;
      return result ? { ...result, membernumber } : result;
    },
  };

  constructor(
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}
  // #region component members
  // #endregion component members
}
