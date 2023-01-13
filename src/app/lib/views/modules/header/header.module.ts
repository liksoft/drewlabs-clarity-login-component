import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ViewHeaderComponent } from './header.component';
import { ViewHeader } from "./header.service";

@NgModule({
  imports: [CommonModule],
  declarations: [ViewHeaderComponent],
  exports: [ViewHeaderComponent],
})
export class ViewHeaderModule {
  static forRoot(): ModuleWithProviders<ViewHeaderModule> {
    return {
      ngModule: ViewHeaderModule,
      providers: [ViewHeader],
    };
  }
}
