import { Component, Input } from '@angular/core';
import { configsDbNames as configurationsCacheConfig } from 'src/app/lib/bloc';
import { MoralMemberType } from '../types';

@Component({
    selector: 'moral-member-metadata',
    templateUrl: './moral-member-metadata.component.html',
    styles: []
})
export class MoralMemberMetaDataComponent {

    // #region Configuration values
    configsDbNames = configurationsCacheConfig
    // #endregion Configuration values

    // #region Component inputs
    @Input() metadata!: MoralMemberType;
    @Input() editable: boolean = false;
    // #endregion Component inputs
}