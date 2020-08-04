import { ModalOverlayService } from '../../../services/modal-overlay.service';
import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { BaseModal } from '../base-modal/base-modal';
import { PaddingSize } from '../../../ui-models';

@Component({
	selector: 'cdx-modal',
	template: `
		<cdx-card
			[padding]="padding"
			[center]="center"
			roundedCorners="medium"
			tabindex="0"
			cdkTrapFocus
			[cdkTrapFocusAutoCapture]="canDismiss"
		>
			<button
				cdkFocusInitial
				aria-label="Dismiss modal"
				class="modal-closeBtn"
				*ngIf="canDismiss"
				(click)="closeModal()"
			>
				<cdx-svg-icon name="cross" size="small" fill="dark"></cdx-svg-icon>
			</button>
			<ng-content></ng-content>
		</cdx-card>
	`,
	styleUrls: ['../base-modal/base-modal.scss', './modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends BaseModal {
	@HostBinding('class.modal--canDismiss')
	@Input()
	canDismiss: Boolean = true;

	@Input() center = false;
	@Input() padding = PaddingSize.Default;
	@Input() roundedCorners = true;
	@Input() autoComplete = false;

	@HostBinding('class.modal--positioned')
	@Input()
	positioned: Boolean = false;

	constructor(public modalOverlayService: ModalOverlayService) {
		super(modalOverlayService);
	}
}
