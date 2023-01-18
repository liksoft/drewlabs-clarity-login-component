import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";
import { TestAuthInterceptor } from "src/app/lib/bloc";
import { environment } from "src/environments/environment";
import { routes as routesConfigs } from "../../routes";
import { SharedModule } from "../../shared.module";
import { ClientsComponent } from "./clients.component";
import { ClientsHomeComponent } from "./home/clients-home.component";
import {
  IndividualMemberComponent,
  IndividualMemberMetadataComponent,
  MemberAddressComponent,
  MemberHeaderComponent, MemberListComponent, MoralMemberComponent,
  MoralMemberMetaDataComponent,
  ProjectMemberPipe
} from "./member";
import { IndividualMemberAddComponent } from "./member-add-edit/individual-member-add.component";
import { MemberAddEditComponent } from "./member-add-edit/member-add-edit.component";
import { MoralMemberAddComponent } from "./member-add-edit/moral-member-add.component";
import { ProcurationsComponent } from "./procurations/procurations.component";

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
    component: IndividualMemberComponent,
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
    MemberAddEditComponent,
    ClientsHomeComponent,
    IndividualMemberAddComponent,
    MoralMemberAddComponent,
    IndividualMemberComponent,
    MemberHeaderComponent,
    MoralMemberComponent,
    MemberAddressComponent,
    IndividualMemberMetadataComponent,
    MoralMemberMetaDataComponent,

    // Pipes
    ProjectMemberPipe,
  ],
  exports: [
    ClientsComponent,
    ClientsHomeComponent,
    MemberListComponent,
    ProcurationsComponent,
    IndividualMemberComponent,
    MemberAddEditComponent,
    ClientsHomeComponent,
    IndividualMemberAddComponent,
    MoralMemberAddComponent,
    MemberHeaderComponent,
    MoralMemberComponent,
    MemberAddressComponent,
    IndividualMemberMetadataComponent,
    MoralMemberMetaDataComponent,

    // Pipes
    ProjectMemberPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TestAuthInterceptor,
      multi: true,
    },
  ],
})
export class ClientsModule {}
