import { Location } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  UIStateProvider,
  UI_STATE_PROVIDER,
} from "./lib/views/partials/ui-state";
import { map, Subject } from "rxjs";
import { isEmpty } from "@azlabsjs/utilities";
import { JSDate } from "@azlabsjs/js-datetime";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
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
  private _destroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    private httpClient: HttpClient
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
