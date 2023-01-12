import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { JSDate } from "@azlabsjs/js-datetime";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { TranslateService } from "@ngx-translate/core";
import { map } from "rxjs";
import {
  UIStateProvider,
  UI_STATE_PROVIDER
} from "./lib/views/partials/ui-state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  state$ = this.uiState.uiState.pipe(
    map((state) => ({
      message: state.uiMessage,
      status: state.status,
      hasError: state.hasError,
      hidden:
        state.performingAction ||
        typeof state.status === "undefined" ||
        state.status === null,
      performingAction: state.performingAction,
    }))
  );

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

  onEndActionEvent({ status, message }: { status?: number; message?: string }) {
    this.uiState.endAction(message, status);
  }
}
