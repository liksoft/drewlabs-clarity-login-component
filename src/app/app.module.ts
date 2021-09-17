import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./lib/views/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// Register Fr local for it to be applied to global application local
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";
import { CoreComponentModule } from "./lib/core/components";
import { DrewlabsHttpModule } from "./lib/core/http";
import { StorageModule } from "./lib/core/storage";
import { AuthTokenModule } from "./lib/core/auth-token";
import { AuthModule } from "./lib/core/auth";
import { environment } from "src/environments/environment";
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateModule,
  TranslateService,
  TranslateLoader,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslationService } from "./lib/core/translator";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { AppComponentsLoadingComponent } from "./lib/views/partials/ui-state-components/app-component-loader.component";
import { AppUINotificationComponent } from "./lib/views/partials/ui-state-components/app-ui-notification.component";
import { DynamicFormControlModule } from "./lib/core/components/dynamic-inputs/dynamic-form-control";
import { DrewlabsV2_1LoginResultHandlerFunc } from "./lib/core/auth/rxjs/operators";
import { LoginV2_1Response } from "./lib/core/auth/contracts/v2/login.response";
import { parseV3HttpResponse } from "./lib/core/http/core/v3/http-response";

export function AppDrewlabsV2_1LoginResultHandlerFunc(response: any) {
  return DrewlabsV2_1LoginResultHandlerFunc(LoginV2_1Response)(response);
}

registerLocaleData(localeFr, "fr", localeFrExtra);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export class TranslateHandler implements MissingTranslationHandler {
  handle = (params: MissingTranslationHandlerParams) => {
    return params.key;
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AppComponentsLoadingComponent,
    AppUINotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: environment?.production
        ? []
        : [
            {
              provide: MissingTranslationHandler,
              useClass: TranslateHandler,
            },
          ],
    }),
    SharedModule.forRoot(),
    CoreComponentModule.forRoot(),
    DrewlabsHttpModule.forRoot({
      serverURL: environment.APP_SERVER_URL,
      requestResponseHandler: parseV3HttpResponse, // Modifiable
    }),
    StorageModule.forRoot({ secretKey: environment.APP_SECRET }),
    AuthTokenModule.forRoot({}),
    AuthModule.forRoot({
      loginResponseHandler: AppDrewlabsV2_1LoginResultHandlerFunc,
      serverConfigs: {
        host: null,
        loginPath: "auth/v1/login",
        logoutPath: "auth/v1/logout",
        usersPath: "admin/users",
      },
    }),
    BrowserAnimationsModule,
    DynamicFormControlModule.forRoot({
      serverConfigs: {
        host: environment.FORM_SERVER_URL,
        formsPath: environment.endpoints?.forms,
        controlsPath: environment?.endpoints?.formControls,
        controlOptionsPath: environment?.endpoints?.controlOptions,
        controlBindingsPath: environment?.endpoints?.controlBindings,
      },
      formsAssets: "/assets/resources/jsonforms.json",
    }),
  ],
  providers: [
    TranslationService,
    TranslateService,
    {
      provide: DROPZONE_CONFIG,
      useValue: {
        url: environment.APP_FILE_SERVER_URL,
        maxFilesize: 10,
        acceptedFiles: null,
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
      },
    },
    {
      provide: "FILE_STORE_PATH",
      useValue: environment.APP_FILE_SERVER_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
