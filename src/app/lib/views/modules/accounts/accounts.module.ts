import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
    exports: []
})
export class AccountsModule {
    static forRoot(): ModuleWithProviders<AccountsModule> {
        return {
            ngModule: AccountsModule,
            providers: []
        }
    }
}