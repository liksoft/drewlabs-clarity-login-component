import { Location } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
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
import { JSDate } from "@iazlabs/js-datetime";
import { HttpClient } from "@angular/common/http";
import { FORM_CLIENT } from "./lib/core/components/dynamic-inputs/angular";
import { FormsClient } from "./lib/core/components/dynamic-inputs/core";
import { doLog } from "./lib/core/rxjs/operators";

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
  private _destroy$ = new Subject<void>();

  // form$ = this.client.get(65);

  // value = {
  //   member_type: 1,
  //   category_id: 1,
  //   activity_sector_id: 1,
  //   business_link_id: 1,
  //   address: {
  //     country: "TG",
  //     city: "LOME",
  //     district: "HEDZRANAWOE",
  //     phone_number: "22891969456",
  //     other_phone_number: null,
  //     email: "mail@example.com",
  //     postal_box: "BP 228 LOME",
  //   },
  //   individual: {
  //     lastname: "SIDOINE",
  //     firstname: "AZOMEDOH",
  //     birthdate: "31/12/2021",
  //     birthplace: "LOME",
  //     nationality: "TOGOLAISE",
  //     gender_id: null,
  //     civil_state_id: 3,
  //     marital_status_id: [1,2,3],
  //     spouce_lastname: null,
  //     spouce_firstname: null,
  //     second_lastname: null,
  //     second_firstname: null,
  //     children: null,
  //   },
  //   moral: {
  //     legal_form: null,
  //     social_reason: null,
  //     receipt_number: null,
  //   },
  //   stake_holders: [
  //     {
  //       lastname: "AZIABU",
  //       firstname: "MEDARD",
  //       birthdate: "31/12/2022",
  //       birthplace: "LOME",
  //       gender_id: null,
  //       civil_state_id: 2,
  //       marital_status_id: 2,
  //       nationality: "TOGOLAISE",
  //       phone_number: "22899345600",
  //       other_phone_number: null,
  //       email: null,
  //       postal_box: null,
  //       activity: "AGRICULTURE",
  //       country: "TG",
  //       zone_id: null,
  //       city: "LOME",
  //       district: "ADAKPAME",
  //       __FORM_ARRAY__INDEX__: 0,
  //       index: 0,
  //     },
  //     {
  //       lastname: "AZIABU",
  //       firstname: "FRANCIS",
  //       birthdate: "12/03/2001",
  //       birthplace: "LOME",
  //       gender_id: null,
  //       civil_state_id: 4,
  //       marital_status_id: 3,
  //       nationality: "TOGOLAISE",
  //       phone_number: "22893203345",
  //       other_phone_number: null,
  //       email: null,
  //       postal_box: null,
  //       activity: "ECONOMIE",
  //       country: "TG",
  //       zone_id: null,
  //       city: "LOME",
  //       district: null,
  //       __FORM_ARRAY__INDEX__: 1,
  //       index: 1,
  //     },
  //   ],
  //   moral_signatories: [
  //     {
  //       lastname: null,
  //       firstname: null,
  //       birthdate: null,
  //       birthplace: null,
  //       gender_id: null,
  //       civil_state_id: null,
  //       marital_status_id: null,
  //       nationality: null,
  //       phone_number: null,
  //       other_phone_number: null,
  //       email: null,
  //       postal_box: null,
  //       activity: null,
  //       country: null,
  //       zone_id: null,
  //       city: null,
  //       district: null,
  //       __FORM_ARRAY__INDEX__: null,
  //       index: null,
  //     },
  //   ],
  // };

  constructor(
    private translate: TranslationService,
    private router: Router,
    private location: Location,
    @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    @Inject(HTTP_CLIENT) errorHandler: ErrorHandler,
    private httpClient: HttpClient,
    // @Inject(FORM_CLIENT) private client: FormsClient
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

  ngOnInit() {}

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
