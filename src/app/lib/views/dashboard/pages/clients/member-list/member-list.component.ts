import { Component } from "@angular/core";
import { individuals, morals } from "../testing/members";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
})
export class MemberListComponent {
  public individuals = individuals;
  public morals = morals;
}
