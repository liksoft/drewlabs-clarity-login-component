import { Component, Input } from '@angular/core';
import { AddressType } from '../types';

@Component({
    selector: 'member-address',
    templateUrl: './member-address.component.html'
})
export class MemberAddressComponent {

    // #region Component properties
    @Input() address!: AddressType;
    @Input() editable: boolean = false;
    // #endregion Component properties
}