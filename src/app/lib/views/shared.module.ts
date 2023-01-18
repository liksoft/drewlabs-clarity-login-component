import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LOCALE_ID, ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxAzlCacheModule } from "@azlabsjs/ngx-azl-cache";
import { NgxClrSmartGridModule } from "@azlabsjs/ngx-clr-smart-grid";
import { NgxSmartFormModule } from "@azlabsjs/ngx-smart-form";
import { ClarityModule } from "@clr/angular";
import { TranslateModule } from "@ngx-translate/core";
import { StrategyBasedAuthModule } from "./login/core";
import { DatagridModule } from './modules/datagrid';
import { ViewHeaderModule } from "./modules/header";
import { IconsModule } from "./modules/icons";
import { NavModule } from "./modules/nav";
import { AzlDashboardModule } from "./partials/dashboard/dashboard.module";
import { ProgressBarModule } from "./partials/progress-bar";
import { SidebarModule } from "./partials/sidebar";
import { TopBarModule } from "./partials/topbar";
import { UIStateComponentsModule } from "./partials/ui-state";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClarityModule,
    DragDropModule,
    NgxClrSmartGridModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ClarityModule,
    TranslateModule,
    DragDropModule,
    //
    ProgressBarModule,
    UIStateComponentsModule,
    TopBarModule,
    SidebarModule,

    // TODO : EXPORT StrategyBasedAuthModule
    StrategyBasedAuthModule,
    NavModule,

    // azlabsjs modules
    NgxSmartFormModule,
    NgxClrSmartGridModule,

    // Export Azl dashboard module
    AzlDashboardModule,

    // Azl cache module
    NgxAzlCacheModule,

    // Icons module
    IconsModule,

    // Components
    ViewHeaderModule,

    // Modules
    DatagridModule
  ],
  declarations: [],
  providers: [{ provide: LOCALE_ID, useValue: "fr" }],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: LOCALE_ID, useValue: "fr" }],
    };
  }
}
