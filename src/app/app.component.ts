import { Component, AfterViewInit } from "@angular/core";
import { TranslationService } from "./lib/core/translator/translator.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Location } from "@angular/common";
import "moment/locale/fr";
import "moment/locale/en-gb";
import * as lodash from "lodash";
import { doLog } from "./lib/core/rxjs/operators";
import { AppUIStateProvider } from "./lib/core/ui-state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "CNSS PAIEMENTS";

  uiState$ = this.uiState.uiState.pipe(doLog("Application Global UI State: "));

  constructor(
    private translate: TranslationService,
    private router: Router,
    private location: Location,
    private uiState: AppUIStateProvider
  ) {
    this.translate.provider.addLangs(["en", "fr"]);
    const browserLang = this.translate.provider.getBrowserLang();
    // Log(browserLang);
    this.translate.provider.setDefaultLang(browserLang);
    // Insure that translation provider use the user browser language
    this.translate.provider.use(
      browserLang.match(/en|fr/) ? browserLang : "en"
    );
    // Set moment locale
    moment.locale(browserLang);
  }

  ngAfterViewInit() {}

  onIsAuthenticated(value: boolean) {
    setTimeout(() => {
      const currentPath = this.location.path();
      if (value && lodash.isEmpty(currentPath)) {
        this.router.navigateByUrl("/dashboard");
        return;
      }
    }, 1000);
  }

  onEndActionEvent({ status, message }: { status: number; message: string }) {
    this.uiState.endAction(message, status);
  }
}
