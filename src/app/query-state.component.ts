import { Component } from "@angular/core";
import { tap } from "rxjs";
import { useQuery } from './libs/requests/angular';
import { TestQueryStateProvider } from "./query-state.service";

@Component({
  selector: "app-query-state",
  template: ` <pre *ngIf="state$ | async as state">{{ state | json }}</pre> `,
  providers: [TestQueryStateProvider],
})
export class QueryStateComponent {
  // state$ = useQuery<QueryType>(
  //   {
  //     path: "api/v1/customers",
  //     method: "GET",
  //     observe: "request",
  //     // provider: this.httpClient
  //   },
  //   true
  // );
  state$ = useQuery(this.queryProvider, "api/v1/customers").pipe(
    tap(console.log)
  );

  constructor(private queryProvider: TestQueryStateProvider) {}
}
