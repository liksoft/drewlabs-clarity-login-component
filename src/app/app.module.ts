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
import { environment } from "src/environments/environment";
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxSmartFormModule } from "@azlabsjs/ngx-smart-form";
import { DOCUMENT_SESSION_STORAGE, StorageModule } from "@azlabsjs/ngx-storage";

// #region UI state module imports
import {
  UIStateModule,
  UIStateProvider,
  UIStateStatusCode,
  UI_STATE_PROVIDER,
  UIStateComponentsModule,
} from "./lib/views/partials/ui-state";
// #endregion UI state module imports

// #region Dropzone configuration
import { first, map, tap } from "rxjs/operators";
import { LocalStrategy, StrategyBasedAuthModule } from "./lib/views/login/core";
import {
  AuthStrategies,
  AUTH_ACTION_HANDLERS,
  AUTH_CLIENT_CONFIG,
  AUTH_SERVICE_CONFIG,
} from "./lib/views/login/constants";
import { interval, lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
// #endregion Dropzone configuration

registerLocaleData(localeFr, "fr", localeFrExtra);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const DropzoneDictLoader = async (translate: TranslateService) => {
  return await lastValueFrom(
    translate
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
        map((translations) => ({
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
        }))
      )
  );
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule.forRoot(),
    // UI STATE PROVIDERS
    UIStateModule.forRoot(),
    UIStateComponentsModule.forRoot(),
    // DYNAMIC CONTROLS PROVIDERS
    NgxSmartFormModule.forRoot({
      // Optional : Required only to get data dynamically from the server
      // Server configuration for dynamically loading
      // Select, Checkbox and Radio button from server
      serverConfigs: {
        api: {
          host: environment.forms.host,
          // Custom path on the server else the default is used
          bindings: environment.forms.endpoints.bindingsPath,
        },
      },
      // Path to the form assets
      // This path will be used the http handler to load the forms in cache
      formsAssets: "/assets/resources/jsonforms.json",
      dropzoneConfigs: {
        url: environment.APP_FILE_SERVER_URL,
        maxFilesize: 10,
        acceptedFiles: "image/*",
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
      },
    }),
    StorageModule.forRoot({
      secret: environment.storage.secret,
      prefix: environment.storage.prefix, // Not required, include only to prefix keys before they are added to the cache
    }),
    // TODO: ADD STRATEGY BASED AUTH MODULE
    StrategyBasedAuthModule.forRoot(
      {
        provide: AUTH_ACTION_HANDLERS,
        useFactory: (uiState: UIStateProvider, router: Router) => {
          return {
            onAuthenticationFailure: () => {
              uiState.endAction(
                "login.authenticationFailed",
                UIStateStatusCode.BAD
              );
            },
            onAuthenticaltionSuccessful: () => {
              console.log("Redirecting...");
              uiState.endAction(
                "login.successful",
                UIStateStatusCode.AUTHENTICATED
              );
            },
            onPerformingAction: () => {
              uiState.startAction();
            },
            onError: () => {
              uiState.endAction("", UIStateStatusCode.ERROR);
            },
            onLogout: () => {
              interval(300)
                .pipe(
                  first(),
                  tap(() => {
                    router.navigateByUrl("/login");
                    uiState.endAction();
                  })
                )
                .subscribe();
            },
          };
        },
        deps: [UI_STATE_PROVIDER, Router],
      },
      {
        provide: AUTH_SERVICE_CONFIG,
        useFactory: (client: HttpClient, storage: Storage) => ({
          strategies: [
            {
              id: AuthStrategies.LOCAL,
              strategy: new LocalStrategy(
                client,
                environment.auth.host,
                storage
              ),
            },
          ],
          autoLogin: true,
        }),
        deps: [HttpClient, DOCUMENT_SESSION_STORAGE],
      }
    ),
  ],
  providers: [
    TranslateService,
    {
      provide: "FILE_STORE_PATH",
      useValue: environment.APP_FILE_SERVER_URL,
    },
    {
      provide: AUTH_CLIENT_CONFIG,
      useValue: {
        id: environment.auth.clientID,
        secret: environment.auth.clientSecret,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
