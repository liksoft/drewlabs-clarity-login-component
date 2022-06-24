import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProgressBarModule } from "./partials/progress-bar";
import { UIStateComponentsModule } from "./partials/ui-state";
import { TopBarModule } from "./partials/topbar";
import { SidebarModule } from "./partials/sidebar";
import { StrategyBasedAuthModule } from "./login/core";
import { NgxSmartFormModule } from "@azlabsjs/ngx-smart-form";
import { NgxClrSmartGridModule } from "@azlabsjs/ngx-clr-smart-grid";

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

    // azlabsjs modules
    NgxSmartFormModule,
    NgxClrSmartGridModule,
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
