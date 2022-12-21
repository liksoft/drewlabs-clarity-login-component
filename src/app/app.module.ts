import { Injector, NgModule, Type } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./lib/views/shared.module";

// Register Fr local for it to be applied to global application local
import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import localeFrExtra from "@angular/common/locales/extra/fr";
import localeFr from "@angular/common/locales/fr";
import { NgxSmartFormModule } from "@azlabsjs/ngx-smart-form";
import { DOCUMENT_SESSION_STORAGE, StorageModule } from "@azlabsjs/ngx-storage";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "src/environments/environment";

// #region UI state module imports
import {
  UIStateComponentsModule,
  UIStateModule,
  UIStateProvider,
  UIStateStatusCode,
  UI_STATE_PROVIDER,
} from "./lib/views/partials/ui-state";
// #endregion UI state module imports

// #region Dropzone configuration
import { Router } from "@angular/router";
import { NgxClrSmartGridModule } from "@azlabsjs/ngx-clr-smart-grid";
import {
  APP_CONFIG_MANAGER,
  ConfigurationManager,
  NgxConfigModule,
} from "@azlabsjs/ngx-config";
import { NgxIntlTelInputModule } from "@azlabsjs/ngx-intl-tel-input";
import { HTTP_HOST, QueryModule } from "@azlabsjs/ngx-query";
import { HttpResponse } from "@azlabsjs/requests";
import { interval, lastValueFrom } from "rxjs";
import { first, map, tap } from "rxjs/operators";
import {
  AUTH_ACTION_HANDLERS,
  AUTH_CLIENT_CONFIG,
  AUTH_SERVICE_CONFIG,
  AuthStrategies,
} from "./lib/views/login/constants";
import { LocalStrategy, StrategyBasedAuthModule } from "./lib/views/login/core";
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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    // Load NgxIntel Input
    NgxIntlTelInputModule.forRoot(),
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
      formsAssets: "/assets/resources/forms.json",

      // templateTextProvider: {
      //   provide: TEMPLATE_DICTIONARY,
      //   useFactory: (translate: TranslateService) => {
      //     return translate.stream();
      //   },
      //   deps: [TranslateService]
      // },
      uploadOptions: {
        interceptorFactory: (injector: Injector) => {
          // Replace the interceptor function by using the injector
          return (request, next) => {
            request = request.clone({
              options: {
                ...request.options,
                headers: {
                  ...request.options.headers,
                  "x-client-id": environment.forms.upload.clientid,
                  "x-client-secret": environment.forms.upload.clientsecret,
                },
              },
            });
            return next(request);
          };
        },
      },
      optionsRequest: {
        interceptorFactory: (injector: Injector) => {
          // Replace the interceptor function by using the injector
          return async (request, next) => {
            // request = request.clone({
            //   options: {
            //     ...request.options,
            //     headers: {
            //       ...request.options.headers,
            //       Authorization: `Basic ${btoa('user:password')}`,
            //     },
            //   },
            // });
            const response = await (next(request) as Promise<HttpResponse>);
            let res = response["response"] as Record<string, any>;
            response["response"] =
              typeof res["data"] !== "undefined" && res["data"] !== null
                ? res["data"]
                : res;
            return response;
          };
        },
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
    NgxConfigModule.forRoot({
      environment: environment, // The angular enviroment values to fallback to if not JSON configuration are provided
      // jsonConfigURL: '<URL_To_Webservice_or_JSON_ASSETS>', // Optional
      // jsonLoader: {
      //   factory: () => {
      //     // Load json configuration and return an instance of {@see JSONConfigLoader} type
      //   }; // Provider factory function
      //   deps: any[]; // Provider
      // },
    }),
    NgxClrSmartGridModule,
    HttpClientModule,
    QueryModule.forRoot({
      hostProvider: {
        provide: HTTP_HOST,
        useFactory: (configManager: ConfigurationManager) => {
          return configManager.get("api.host", "https://coopecclients.lik.tg");
        },
        deps: [APP_CONFIG_MANAGER],
      },
      httpClient: HttpClient as Type<any>,
    }),
  ],
  providers: [
    TranslateService,
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
