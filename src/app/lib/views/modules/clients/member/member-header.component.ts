import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef } from "@angular/core";
import { APP_CONFIG_MANAGER, ConfigurationManager } from "@azlabsjs/ngx-config";
import { environment } from "src/environments/environment";
import { MemberType } from "../types";

@Component({
  selector: "member-header",
  templateUrl: "./member-header.component.html",
  styles: [
    `
      :host {
        margin-bottom: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberHeaderComponent {
  // #region Configuration values
  settingscachenames = environment.app.caching.keys.settings;
  clientcachenames = environment.app.caching.keys.clients;
  // #endregion Configuration values

  // #region Component projected content
  @Input("avatar") avatarRef!: TemplateRef<any>;
  // #endregion Component projected content

  // #region Component inputs
  @Input() editable: boolean = false;
  @Input() member!: MemberType;
  // #endregion Component inputs

  constructor(
    @Inject(APP_CONFIG_MANAGER) private config: ConfigurationManager
  ) {}
}
