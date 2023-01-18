import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { MoralMemberType } from "../../types";

@Component({
  selector: "moral-member-metadata",
  templateUrl: "./member-metadata.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoralMemberMetaDataComponent {
  // #region Configuration values
  settingcachingkeys = environment.app.caching.keys.settings;
  // #endregion Configuration values

  // #region Component inputs
  @Input() metadata!: MoralMemberType;
  @Input() editable: boolean = false;
  // #endregion Component inputs
}
