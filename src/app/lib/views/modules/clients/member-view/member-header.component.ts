import { Component, Input, TemplateRef } from "@angular/core";
import { configsDbNames as configurationsCacheConfig } from 'src/app/lib/bloc';
import { clientsDbConfigs } from '../db.slice.factory';
import { MemberType } from '../types';

@Component({
  selector: "member-header",
  templateUrl: "./member-header.component.html",
  styles: [
    `
      :host {
        margin-bottom: 12px;
      }
    `
  ]
})
export class MemberHeaderComponent {

  // #region Configuration values
  configsDbNames = configurationsCacheConfig
  clientsDbnames = clientsDbConfigs
  // #endregion Configuration values

  // #region Component projected content
  @Input('avatar') avatarRef!: TemplateRef<any>;
  // #endregion Component projected content

  // #region Component inputs
  @Input() editable: boolean = false;
  @Input() member!: MemberType;
  // #endregion Component inputs
}
