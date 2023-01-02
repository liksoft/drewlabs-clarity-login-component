import {
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Optional
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import {
  debounceTime,
  filter,
  ObservableInput,
  Subject,
  takeUntil
} from "rxjs";
import { DBSyncProvider } from "./dbsync.service";
import { defaultConfigs } from "./defaults";
import {
  DBSyncProviderConfigType,
  DBSYNC_PROVIDER_CONFIG
} from "./types";

@Injectable()
export class DbSyncRouter implements OnDestroy {
  //#region Class properties
  private readonly _destroy$ = new Subject<void>();
  private readonly loadedForRoute: { [k: string]: boolean } = {};
  //#endregion Class properties

  /**
   * Creates an instance of {@see DbSyncRouter} service class
   *
   * @param router
   * @param analytics
   */
  constructor(
    private injector: Injector,
    private router: Router,
    private provider: DBSyncProvider,
    @Inject(DBSYNC_PROVIDER_CONFIG)
    @Optional()
    private config: DBSyncProviderConfigType = defaultConfigs
  ) {}

  /**
   * Provides a subscription
   *
   * @param unsubscribeNotifier
   */
  public subscribe(unsubscribeNotifier?: ObservableInput<unknown>) {
    if (
      this.config &&
      typeof this.config.router &&
      this.config.router?.slicesFactory
    ) {
      const slices =
        typeof this.config.router.slicesFactory === "function"
          ? this.config.router.slicesFactory(this.injector)
          : this.config.router.slicesFactory;
      this.router.events
        .pipe(
          filter((events) => events instanceof NavigationEnd),
          debounceTime(5000),
          takeUntil(unsubscribeNotifier ? unsubscribeNotifier : this._destroy$)
        )
        .subscribe((event) => {
          const _event = event as NavigationEnd;
          const url = _event.urlAfterRedirects;
          if (slices) {
            for (let path of Object.keys(slices)) {
              if (this.loadedForRoute[path]) {
                continue;
              }
              const _path = path.startsWith("/") ? path : `/${path}`;
              // TODO: If required in future release use regular expression
              const value = slices[path];
              if (url.startsWith(_path) && value) {
                this.provider.loadSlice(value);
              }
            }
          }
        });
    }
  }

  // Service destructor
  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
