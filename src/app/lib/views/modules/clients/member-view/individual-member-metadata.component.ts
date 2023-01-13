import { Component, Input } from "@angular/core";
import { configsDbNames as configurationsCacheConfig } from "src/app/lib/bloc";
import { clientsDbConfigs } from "../db.slice.factory";
import { CustomerType } from "../types";

@Component({
  selector: "individual-member-metadata",
  templateUrl: "./individual-member-metadata.component.html",
})
export class IndividualMemberMetadataComponent {
  // #region Configuration values
  configsDbNames = configurationsCacheConfig;
  clientsDbnames = clientsDbConfigs;
  // #endregion Configuration values
  // #region Component properties
  @Input() data!: CustomerType;
  @Input() editable: boolean = false;
  // #endregion Component properties
}
