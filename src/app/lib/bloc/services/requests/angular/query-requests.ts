import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  inject,
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from "@angular/core";
import { REQUEST_ACTIONS } from "../http";
import { Requests } from "../requests";
import {
  Action,
  CommandInterface,
  DispatchLeastArgumentTypes,
  RequestInterface,
  RequestsConfig,
} from "../types";
import { HTTPRequestHandler } from "./http-request-handler";

const DEFAULT_PLATFORM_VIEW = new InjectionToken<Window>(
  "Platform View Object",
  {
    providedIn: "root",
    factory: () => {
      const { defaultView } = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error("Window is not available");
      }

      return defaultView;
    },
  }
);

@Injectable({
  providedIn: "root",
})
export class QueryRequestsProvider
  implements CommandInterface<RequestInterface, unknown>
{
  //#region Service properties
  private readonly client = new Requests(
    this.backend,
    this.config,
    this.defaultView
  );
  get state$() {
    return this.client.state$;
  }
  get cache() {
    return this.client.cache;
  }
  //#endregion Service properties

  // Creates an instance of { @see NgHTTPClientClient }
  constructor(
    private backend: HTTPRequestHandler,
    @Inject(PLATFORM_ID) @Optional() private platformId: Object,
    @Inject(REQUEST_ACTIONS) @Optional() private config?: RequestsConfig,
    @Inject(DEFAULT_PLATFORM_VIEW) @Optional() private defaultView?: Window
  ) {}

  dispatch<TFunction extends Function>(
    action: Action<RequestInterface> | TFunction,
    ...args: [...DispatchLeastArgumentTypes<TFunction>]
  ): unknown {
    return this.client.dispatch(action, ...args);
  }

  // Handles object destruct action
  ngOnDestroy() {
    if (this && this.platformId && isPlatformBrowser(this.platformId)) {
      this.client.destroy();
    }
  }
}
