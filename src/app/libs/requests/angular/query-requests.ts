import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { RequestsConfig, REQUEST_ACTIONS } from "../http";
import { Requests } from "../requests";
import { CommandInterface, QueryArguments } from "../types";

@Injectable({
  providedIn: "root",
})
export class QueryRequestsProvider implements CommandInterface<unknown> {
  //#region Service properties
  private readonly client = new Requests();
  get state$() {
    return this.client.state$;
  }
  get cache() {
    return this.client.cache;
  }
  //#endregion Service properties

  // Creates an instance of { @see NgHTTPClientClient }
  constructor(
    @Inject(PLATFORM_ID) @Optional() private platformId: Object,
    @Inject(REQUEST_ACTIONS) @Optional() private config?: RequestsConfig
  ) {}

  dispatch<T extends Function>(
    action: T,
    ...args: [...QueryArguments<typeof action>]
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
