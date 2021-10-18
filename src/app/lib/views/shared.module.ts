import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";
import { StorageModule } from "../core/storage";
import { AuthTokenModule } from "../core/auth-token";
import { AuthModule } from "../core/auth";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpModule } from "../core/http";
import { PipesModule } from './partials/pipes';
import { DynamicFormControlModule } from '../core/components/dynamic-inputs/angular';
import { ProgressBarModule } from './partials/progress-bar';
import { DropzoneModule } from '../core/components/dropzone';
import { UIStateComponentsModule } from './partials/ui-state-components';
import { DatagridHeaderModule } from './partials/datgrid-header';
import { TopBarModule } from './partials/topbar';
import { DetailedTablePreviewModule } from './partials/detailed-table-preview';
import { SidebarModule } from './partials/sidebar';
import { AppModulesModule } from './partials/app-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClarityModule,
    DragDropModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ClarityModule,
    TranslateModule,
    HttpModule,
    StorageModule,
    AuthTokenModule,
    AuthModule,
    DragDropModule,

    //
    PipesModule,
    DynamicFormControlModule,
    ProgressBarModule,
    DropzoneModule,
    UIStateComponentsModule,
    DatagridHeaderModule,
    TopBarModule,
    DetailedTablePreviewModule,
    SidebarModule,
    AppModulesModule
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
