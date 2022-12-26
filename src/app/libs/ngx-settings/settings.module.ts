import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { defaultSettingConfigs } from "./defaults";
import { RESTQueryProvider } from "./settings-query.provider";
import { SettingPipe } from "./settings.pipe";
import {
  SETTINGS_QUERY_CLIENT,
  SETTING_PROVIDER_CONFIG,
  SettingProviderConfigType,
} from "./types";

@NgModule({
  imports: [CommonModule],
  declarations: [SettingPipe],
  exports: [SettingPipe],
  providers: [RESTQueryProvider],
})
export class SettingsModule {
  static forRoot(
    config: SettingProviderConfigType
  ): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        {
          provide: SETTING_PROVIDER_CONFIG,
          useValue: {
            ...config,
            responseInterceptor:
              config.responseInterceptor ??
              defaultSettingConfigs.responseInterceptor,
            pagination: config.pagination ?? defaultSettingConfigs.pagination,
          } as SettingProviderConfigType,
        },
        {
          provide: SETTINGS_QUERY_CLIENT,
          useClass: RESTQueryProvider,
        },
      ],
    };
  }
}
