import { Injectable, OnDestroy, Optional } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterState,
} from "@angular/router";
import { ObservableInput, Subject, takeUntil } from "rxjs";
import { NgxAnalytics } from "./ngx-analytics.service";

@Injectable()
export class NgxRouterAnalytics implements OnDestroy {
  //#region Class properties
  private readonly destroy$ = new Subject<void>();
  //#endregion Class properties

  /**
   * Creates an instance of NgxRouterAnalytics service class
   *
   * @param router
   * @param analytics
   */
  constructor(
    private router: Router,
    private analytics: NgxAnalytics,
    @Optional() private titleService?: Title
  ) {}

  /**
   *
   * @param unsubscribeNotifier
   */
  public subscribe(unsubscribeNotifier?: ObservableInput<unknown>) {
    this.router.events
      .pipe(
        takeUntil(unsubscribeNotifier ? unsubscribeNotifier : this.destroy$)
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.analytics.trackPage({
            path: event.urlAfterRedirects,
            title: this.titleService
              ? this.titleService.getTitle()
              : this.getTitle(
                  this.router.routerState,
                  this.router.routerState.root
                ).join(" > "),
          });
        }
      });
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  private getTitle(state: RouterState, parent: ActivatedRoute) {
    const data: string[] = [];
    if (parent && parent.snapshot.data && parent.snapshot.data["title"]) {
      data.push(parent.snapshot.data["title"]);
    }

    if (state && parent && state.root.firstChild) {
      data.push(...this.getTitle(state, state.root.firstChild));
    }
    return data;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
