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
import { DynamicFormControlModule } from "./lib/core/components/dynamic-inputs/dynamic-form-control";
import { DrewlabsV2LoginResultHandlerFunc, DrewlabsV2_1LoginResultHandlerFunc } from "./lib/core/auth/rxjs/operators";
import { LoginV2_1Response } from "./lib/core/auth/contracts/v2/login.response";
import { parseV3HttpResponse } from "./lib/core/http/core/v3/http-response";
import { HttpModule } from "./lib/core/http";

// #region UI state module imports
import { UIStateComponentsModule } from "./lib/views/partials/ui-state-components";
import { UIStateModule } from "./lib/core/ui-state";
// #endregion UI state module imports

// #region Dropzone configuration
import {
  DropzoneDict,
  DropzoneModule,
  DROPZONE_DICT,
} from "./lib/core/components/dropzone";
import { map } from "rxjs/operators";
import { parseV2HttpResponse } from "./lib/core/http/core/v2/http-response";
// #endregion Dropzone configuration

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

export const DropzoneDictLoader = async (translate: TranslateService) => {
  return await translate
    .get(
      [
        "dictAcceptedFilesLabel",
        "dictFallbackMessageLabel",
        "dictFileTooBigLabel",
        "dictInvalidFileTypeLabel",
        "dictCancelUploadLabel",
        "dictResponseErrorLabel",
        "dictCancelUploadConfirmationLabel",
        "dictRemoveFileConfirmationLabel",
        "dictRemoveFileLabel",
        "dictMaxFilesExceededLabel",
        "dictUploadCanceled",
      ],
      {
        maxFilesize: "{{maxFilesize}}",
        filesize: "{{filesize}}",
      }
    )
    .pipe(
      map(
        (translations) =>
          ({
            dictFallbackMessage: translations?.dictFallbackMessageLabel,
            dictFileTooBig: translations?.dictFileTooBigLabel,
            dictInvalidFileType: translations?.dictInvalidFileTypeLabel,
            dictResponseError: translations?.dictResponseErrorLabel,
            dictCancelUpload: translations?.dictCancelUploadLabel,
            dictCancelUploadConfirmation:
              translations?.dictCancelUploadConfirmationLabel,
            dictRemoveFile: translations?.dictRemoveFileLabel,
            dictRemoveFileConfirmation:
              translations?.dictRemoveFileConfirmationLabel,
            dictMaxFilesExceeded: translations?.dictMaxFilesExceededLabel,
            dictUploadCanceled: translations?.dictUploadCanceled,
            dictAcceptedFiles: translations?.dictAcceptedFilesLabel,
          } as DropzoneDict)
      )
    )
    .toPromise();
};

@NgModule({
  declarations: [AppComponent],
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
    HttpModule.forRoot({
      serverURL: environment.APP_SERVER_URL,
      requestResponseHandler: parseV2HttpResponse, // Modifiable
    }),
    StorageModule.forRoot({ secretKey: environment.APP_SECRET }),
    AuthTokenModule.forRoot({}),
    AuthModule.forRoot({
      loginResponseHandler: DrewlabsV2LoginResultHandlerFunc,
      serverConfigs: {
        host: null,
        loginPath: "auth/login",
        logoutPath: "auth/logout",
        usersPath: "auth/users",
      },
    }),
    BrowserAnimationsModule,

    // UI State module
    UIStateModule.forRoot(),
    UIStateComponentsModule.forRoot(),
    // Configure Dropzone module for root
    DropzoneModule.forRoot({
      dropzoneConfig: {
        url: environment.APP_FILE_SERVER_URL,
        maxFilesize: 10,
        acceptedFiles: "image/*",
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
      },
    }),
    DynamicFormControlModule.forRoot({
      serverConfigs: {
        host: environment.FORM_SERVER_URL,
        controlBindingsPath: "api/control-bindings",
      },
    }),
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
      provide: DROPZONE_DICT,
      useFactory: async (translate: TranslateService) => {
        return await DropzoneDictLoader(translate);
      },
      deps: [TranslateService],
    },
    {
      provide: "FILE_STORE_PATH",
      useValue: environment.APP_FILE_SERVER_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
