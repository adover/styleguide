import { Component } from '@angular/core';
import { ModalOverlayService } from '../../../services';
import { BaseModal } from '../base-modal/base-modal';
import { PaddingSize } from '../../../ui-models';

@Component({
	selector: 'cdx-autocomplete-modal',
	template: `
		<cdx-card [padding]="padding" [roundedCorners]="true" [class.autoComplete]="true" tabindex="0" cdkTrapFocus>
			<ng-content></ng-content>
		</cdx-card>
	`,
	styleUrls: ['./autocomplete-modal.component.scss'],
})
export class AutocompleteModalComponent extends BaseModal {
	padding = PaddingSize.None;

	constructor(public modalOverlayService: ModalOverlayService) {
		super(modalOverlayService);
	}
}
