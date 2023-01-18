import {
  ChangeDetectionStrategy,
  Component, Input
} from "@angular/core";
import { environment } from "src/environments/environment";
import { CustomerType } from "../../types";

@Component({
  selector: "individual-member-metadata",
  templateUrl: "./member-metadata.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualMemberMetadataComponent {
  // #region Configuration values
  settingcachingkeys = environment.app.caching.keys.settings;
  // #endregion Configuration values
  // #region Component properties
  @Input() data!: CustomerType;
  @Input() editable: boolean = false;
  // #endregion Component properties

  /**
   * Creates an angular component instance
   */
  constructor() {}
}
