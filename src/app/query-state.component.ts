import { Component } from "@angular/core";
import { useQuery } from "./lib/bloc/services/requests/angular";
import { tap } from "rxjs";
import { TestQueryStateProvider } from "./query-state.service";
import { QueryType } from './lib/bloc/services/requests';

@Component({
  selector: "app-query-state",
  template: ` <pre *ngIf="state$ | async as state">{{ state | json }}</pre> `,
  providers: [TestQueryStateProvider],
})
export class QueryStateComponent {
  myState$ = useQuery<QueryType>(
    {
      path: "api/v1/customers",
      method: "GET",
      observe: "request",
      // provider: this.httpClient
    },
    true
  );
  state$ = useQuery(this.queryProvider, "api/v1/customers").pipe(
    tap(console.log)
  );

  constructor(private queryProvider: TestQueryStateProvider) {}
}
