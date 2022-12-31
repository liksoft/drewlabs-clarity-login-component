import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  createDateQueryParamPipe, PaginateResult, projectPaginateQuery,
  ProjectPaginateQueryParamType,
  QueryFiltersType
} from "@azlabsjs/ngx-clr-smart-grid";
import { ProvidesQuery } from "@azlabsjs/ngx-query";
import { QueryProviderType } from "@azlabsjs/rx-query";
import { Observable } from "rxjs";

@Injectable()
@ProvidesQuery({
  observe: 'response',
  cacheTime: 300000
})
export class GridDataQueryProvider
  implements
    QueryProviderType<
      [
        string,
        ProjectPaginateQueryParamType,
        QueryFiltersType,
        string[],
        string[]
      ]
    >
{
  // Creates instance of the class
  constructor(private http: HttpClient) {}

  query<T>(
    path: string,
    project: ProjectPaginateQueryParamType,
    filters?: QueryFiltersType,
    columns: string[] = ["*"],
    hiddenColumns: string[] = []
  ): Observable<PaginateResult<T>> {
    // Project the query parameter using the projection function
    let query = projectPaginateQuery(
      filters ?? [],
      createDateQueryParamPipe()
    )(project);

    // We append the column and hidden query parameters to the request params
    query = {
      ...query,
      "_columns[]": columns ?? ["*"],
      "_hidden[]": hiddenColumns ?? [],
    };
    return this.http.get(path, { params: query }) as Observable<
      PaginateResult<T>
    >;
  }
}
