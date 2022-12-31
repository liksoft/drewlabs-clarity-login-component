import { Component } from "@angular/core";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
})
export class MemberListComponent {
  // #region component members
  createMoralMember(event: Event) {
    // this.router.navigateByUrl(
    //   this.createRoute ??
    //     `${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.moralClientRoute}`
    // );
  }

  createIndividualMember(event: Event) {
    // this.router.navigateByUrl(
    //   this.createRoute ??
    //     `${routes.dashboardRoute}/${routes.clientsModuleRoute}/${routes.individualClientRoute}`
    // );
  }
  // #endregion component members
}
