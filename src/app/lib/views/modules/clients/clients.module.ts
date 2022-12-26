import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { HighchartsChartModule } from "highcharts-angular";
import { SettingsProvider } from "src/app/libs/ngx-settings";
import { environment } from "src/environments/environment";
import { routes as routesConfigs } from "../../routes";
import { SharedModule } from "../../shared.module";
import { ClientsComponent } from "./clients.component";
import { ClientsHomeComponent } from "./home/clients-home.component";
import { IndividualMemberAddComponent } from "./member-add-edit/individual-member-add.component";
import { MemberAddEditComponent } from "./member-add-edit/member-add-edit.component";
import { MoralMemberAddComponent } from "./member-add-edit/moral-member-add.component";
import { IndividualMemberListComponent } from "./member-list/individual-member-list.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MoralMemberListComponent } from "./member-list/moral-member-list.component";
import { MemberViewComponent } from "./member-view/member-view.component";
import { ProcurationsComponent } from "./procurations/procurations.component";
import { settingEnvironment } from "./settings";

/**
 * Client routes definitions constants. Provides
 * route configuration to various client components
 */
export const CLIENT_ROUTES: Routes = [
  {
    path: routesConfigs.clientsHomeRoute,
    component: ClientsHomeComponent,
  },
  {
    path: routesConfigs.clientsListRoute,
    component: MemberListComponent,
  },
  {
    path: routesConfigs.individualClientRoute,
    component: IndividualMemberAddComponent,
    data: {
      formId: environment.forms.views.createIndividualClient,
    },
  }, //
  {
    path: routesConfigs.moralClientRoute,
    component: MoralMemberAddComponent,
    data: {
      formId: environment.forms.views.createMoralClient,
    },
  },
  {
    path: routesConfigs.clientsHomeRoute,
    component: MemberViewComponent,
  },
  {
    path: routesConfigs.procurationsManageRoute,
    component: ProcurationsComponent,
  },
];

export const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
    children: CLIENT_ROUTES,
  },
];

/**
 * Client Routing module class
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}

/**
 * Clients angular module for provides clients managment components,
 * directives, pipes, and services
 */
@NgModule({
  imports: [SharedModule, HighchartsChartModule, ClientsRoutingModule],
  declarations: [
    ClientsComponent,
    ClientsHomeComponent,
    MemberListComponent,
    ProcurationsComponent,
    MemberViewComponent,
    MemberAddEditComponent,
    ClientsHomeComponent,
    IndividualMemberAddComponent,
    MoralMemberAddComponent,
    IndividualMemberListComponent,
    MoralMemberListComponent,
  ],
  exports: [
    ClientsComponent,
    ClientsHomeComponent,
    MemberListComponent,
    ProcurationsComponent,
    MemberViewComponent,
    MemberAddEditComponent,
    ClientsHomeComponent,
    IndividualMemberAddComponent,
    MoralMemberAddComponent,
    IndividualMemberListComponent,
    MoralMemberListComponent,
  ],
})
export class ClientsModule {
  static forRoot(): ModuleWithProviders<ClientsModule> {
    return {
      ngModule: ClientsModule,

      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: (
            provider: SettingsProvider,
            config: ConfigurationManager
          ) => {
            return async () => {
              console.log("Executing app initializers...");
              provider.loadSlice([
                {
                  endpoint: `${config.get(
                    "api.host",
                    environment.api.host
                  )}/api/member-categories`,
                  key: settingEnvironment.clients.memberCatories,
                },
                {
                  endpoint: `${config.get(
                    "api.host",
                    environment.api.host
                  )}/api/member-types`,
                  key: settingEnvironment.clients.memberTypes,
                },
              ]);
              return Promise.resolve(true);
            };
          },
          deps: [SettingsProvider, APP_CONFIG_MANAGER],
        },
      ],
    };
  }
}
