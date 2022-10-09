import { Routes } from "@angular/router";
import { ClientsComponent } from "./clients.component";
import { ClientsHomeComponent } from "./home/clients-home.component";
import { routes as routesConfigs } from "../../../routes";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberAddEditComponent } from "./member-add-edit/member-add-edit.component";
import { MemberViewComponent } from "./member-view/member-view.component";
import { ProcurationsComponent } from "./procurations/procurations.component";
import { environment } from "src/environments/environment";
import { MoralMemberAddComponent } from "./member-add-edit/moral-member-add.component";
import { IndividualMemberAddComponent } from "./member-add-edit/individual-member-add.component";
import { IndividualMemberListComponent } from "./member-list/individual-member-list.component";
import { MoralMemberListComponent } from "./member-list/moral-member-list.component";

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

export const declarations = [
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
  MoralMemberListComponent
];
