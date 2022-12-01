import { Component } from "@angular/core";
import { first, interval, mergeMap } from "rxjs";
import { QueryType } from "./libs/requests";
import { useQuery } from "./libs/requests/angular";
import { TestQueryStateProvider } from "./query-state.service";

@Component({
  selector: "app-query-state",
  template: `
    <pre *ngIf="state3$ | async as state">
      <pre>Fruits Query Observe request</pre>
      <pre>{{ state | json }}</pre>
      <pre *ngIf="state3_1$ | async as state">{{ state | json }}</pre>
    </pre>
    <div *ngIf="state$ | async as state">
      <pre>Post Query</pre>
      <pre>{{ state | json }}</pre>
      <pre *ngIf="state2$ | async as state">{{ state | json }}</pre>
    </div>
    <div *ngIf="comments$ | async as state">
      <pre>Comment Query</pre>
      <pre>{{ state | json }}</pre>
      <pre *ngIf="comments2$ | async as state">{{ state | json }}</pre>
    </div>
    <pre>Articles Query</pre>
    <pre *ngIf="articles$ | async as state">{{ state | json }}</pre>
    <pre>Toppings Query</pre>
    <pre *ngIf="toppings$ | async as state">{{ state | json }}</pre>
  `,
  providers: [TestQueryStateProvider],
})
export class QueryStateComponent {
  state3$ = useQuery(
    {
      path: "fruits",
      method: "GET",
      observe: "request",
    } as QueryType,
    true
  );
  state3_1$ = interval(2000).pipe(
    first(),
    mergeMap(() =>
      useQuery(
        {
          path: "posts",
          method: "GET",
          observe: "request",
          params: {
            type: "Orange",
            id: 90678
          },
        } as QueryType,
        true
      )
    )
  );
  state$ = useQuery(this.queryProvider, "posts");
  state2$ = interval(2000).pipe(
    first(),
    mergeMap(() => useQuery(this.queryProvider, "posts"))
  );
  comments$ = useQuery(this.queryProvider, "comments");
  comments2$ = interval(2000).pipe(
    first(),
    mergeMap(() => useQuery(this.queryProvider, "comments"))
  );
  articles$ = useQuery(this.queryProvider, "articles");
  toppings$ = useQuery(this.queryProvider, "toppings");

  constructor(private queryProvider: TestQueryStateProvider) {}
}
