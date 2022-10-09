import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { NgxRouterAnalytics } from "./ngx-router-analytics.service";

@Directive({
  selector: "[ngxAnalyticsNavigation]",
})
export class NgxAnalyticsNavigationDirective implements OnDestroy {
  //#region Class properties
  private readonly destroy$ = new Subject<void>();
  //#endregion Class properties

  /**
   * Creates an instance of NgxAnalytics directive
   *
   * @param routerAnalytics
   */
  constructor(private routerAnalytics: NgxRouterAnalytics) {
    //
    this.routerAnalytics.subscribe(this.destroy$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
