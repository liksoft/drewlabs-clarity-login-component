import { Component, Input } from "@angular/core";
import { MemberType } from '../types';

@Component({
  selector: "individual-member",
  templateUrl: "./individual-member.component.html",
  styles: []
})
export class IndividualMemberComponent {

  // #region Component properties
  @Input() member!: MemberType;
  // #endregion Component properties
}
