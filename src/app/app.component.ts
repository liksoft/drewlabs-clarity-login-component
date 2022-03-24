import { Location } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { TranslationService } from "./lib/core/translator/translator.service";
import { Router } from "@angular/router";
import {
  UIStateProvider,
  UIStateStatusCode,
  UI_STATE_PROVIDER,
} from "./lib/views/partials/ui-state";
import { map, Subject, takeUntil, tap } from "rxjs";
import { ErrorHandler, HTTP_CLIENT } from "./lib/core/http";
import { isEmpty } from "@iazlabs/utilities";
import { JSDate } from  '@iazlabs/js-datetime';

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
    private translate: TranslationService,
    private router: Router,
    private location: Location,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    @Inject(HTTP_CLIENT) errorHandler: ErrorHandler
  ) {
    this.translate.provider.addLangs(["en", "fr"]);
    const browserLang = this.translate.provider.getBrowserLang() ?? "fr";
    // Log(browserLang);
    this.translate.provider.setDefaultLang(browserLang);
    // Insure that translation provider use the user browser language
    this.translate.provider.use(
      browserLang.match(/en|fr/) ? browserLang : "fr"
    );
    // Set moment locale
    JSDate.locale(browserLang);

    errorHandler.errorState$
      .pipe(
        takeUntil(this._destroy$),
        tap((state) => {
          this.onEndActionEvent({
            status:
              state.status === 500
                ? UIStateStatusCode.ERROR
                : UIStateStatusCode.BAD,
            message: "",
          });
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

  onDgRefresh(event: unknown) {
    console.log(event);
  }

  onSelectedChanges(event: unknown | unknown[]) {
    console.log(event);
  }
}
