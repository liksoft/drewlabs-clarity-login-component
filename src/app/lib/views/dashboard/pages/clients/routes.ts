import { Routes } from "@angular/router";
import { ClientsComponent } from "./clients.component";
import { ClientsHomeComponent } from "./home/clients-home.component";
import { routes as routesConfigs } from "../../../routes";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberAddEditComponent } from "./member-add-edit/member-add-edit.component";
import { MemberViewComponent } from "./member-view/member-view.component";
import { ProcurationsComponent } from "./procurations/procurations.component";

console.log()

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
    path: routesConfigs.clientsAddEditRoute,
    component: MemberAddEditComponent,
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
];
