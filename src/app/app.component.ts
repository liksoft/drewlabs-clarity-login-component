import { Location } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  UIStateProvider,
  UI_STATE_PROVIDER,
} from "./lib/views/partials/ui-state";
import { map, Observable, tap } from "rxjs";
import { isEmpty } from "@azlabsjs/utilities";
import { JSDate } from "@azlabsjs/js-datetime";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { QueryState } from "./lib/bloc/services/requests/angular";
import { RequestState } from "./lib/bloc/services/requests";
import { QueryType } from "./lib/bloc/services/requests/types";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { HTTPRequestMethods } from "./lib/bloc/services/requests/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "CNSS PAIEMENTS";
  uiState$ = this.uiState.uiState.pipe(
    map((state) => ({
      ...state,
      hidden:
        state.performingAction ||
        typeof state.status === "undefined" ||
        state.status === null,
    }))
  );

  // tslint:disable-next-line: variable-name
  // private _destroy$ = new Subject<void>();

  @QueryState<QueryType<HTTPRequestMethods>>({
    path: "api/v1/customers",
    method: "GET",
  })
  queryState$!: Observable<RequestState>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    private httpClient: HttpClient,
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {
    this.translate.addLangs(["en", "fr"]);
    const browserLang = this.translate.getBrowserLang() ?? "fr";
    // Log(browserLang);
    this.translate.setDefaultLang(browserLang);
    // Insure that translation provider use the user browser language
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : "fr");
    // Set moment locale
    JSDate.locale(browserLang);
  }
  ngOnInit(): void {
    this.queryState$
      .pipe(
        tap((state) => {
          console.log("Response: ", state);
        })
      )
      .subscribe();
  }

  onIsAuthenticated(value: boolean) {
    setTimeout(() => {
      const currentPath = this.location.path();
      if (value && isEmpty(currentPath)) {
        this.router.navigateByUrl("/dashboard");
        return;
      }
    }, 1000);
  }

  onEndActionEvent({ status, message }: { status?: number; message?: string }) {
    this.uiState.endAction(message, status);
  }
}
