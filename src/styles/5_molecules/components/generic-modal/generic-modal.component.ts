import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Inject,
	InjectionToken,
	Input,
	Output,
	Optional,
} from '@angular/core';

export const GENERIC_MODAL_DATA = new InjectionToken<{}>('GENERIC_MODAL_DATA');

export class GenericModal {
	buttonText? = 'Ok, got it';
	icon? = 'alert';
	iconFill? = 'alert';
	title? = `We're having technical issues at present`;
	description?: string;
	ctaAction?: Function = () => {};
	closeAction?: Function = () => {};
}

@Component({
	selector: 'cdx-generic-modal',
	template: `
		<cdx-modal (closeEmitter)="closeModal()" #modal *ngIf="modalData" [center]="true">
			<div class="genericModal-content">
				<cdx-svg-icon [name]="modalData.icon" [fill]="modalData.iconFill" size="medium"></cdx-svg-icon>
				<h5 id="dialog-title">{{ modalData.title }}</h5>
				<ng-content></ng-content>
				<p *ngIf="modalData.description">{{ modalData.description }}</p>
				<button fillStyle="outline" cdxButton autoFocus (click)="ctaEmit()" i18n="@@error-okButton">
					{{ modalData.buttonText }}
				</button>
			</div>
		</cdx-modal>
	`,
	styleUrls: ['./generic-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericModalComponent {
	_modalData: GenericModal = new GenericModal();

	constructor(@Optional() @Inject(GENERIC_MODAL_DATA) public injectedModalData: GenericModal) {
		if (injectedModalData) {
			this._modalData = {
				...this._modalData,
				...injectedModalData,
			};
		}
	}

	@Input() set modalData(data: GenericModal) {
		this._modalData = data;
	}

	get modalData() {
		return this._modalData;
	}

	@Output() modalCTAEmitter: EventEmitter<any> = new EventEmitter();

	closeModal() {
		if (typeof this.modalData.ctaAction === 'function') {
			this.modalData.closeAction();
		}
	}

	ctaEmit() {
		if (typeof this.modalData.ctaAction === 'function') {
			this.modalData.ctaAction();
		}

		this.modalCTAEmitter.emit();
	}
}
