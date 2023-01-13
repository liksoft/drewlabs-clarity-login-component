import { Component } from "@angular/core";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;
      }
    `
  ]
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

  onUpdateMembersipStatus(status?: number) {}
  // #endregion component members
}
