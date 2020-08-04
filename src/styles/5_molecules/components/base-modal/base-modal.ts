import { ESCAPE } from '@angular/cdk/keycodes';
import { EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ModalOverlayRef, ModalOverlayService } from '../../../services';

/**
 * Base modal to encapsulate accessibility attributes and close behaviour <br/>
 *
 * When extending make sure you add the `base-modal.scss` to the `styleUrls` entry of the extending component
 * if you want to inherit the styles, e.g. `styleUrls: ['../base-modal/base-modal.scss', './your-component-styles.scss']`
 */
export abstract class BaseModal implements OnInit {
	modal: ModalOverlayRef;

	@HostBinding('class.modal') cls = true;
	@HostBinding('attr.role') role = 'dialog';
	@HostBinding('attr.aria-modal') ariaModal = true;
	@HostBinding('attr.data-cy') testDataAttribute = 'modal';

	// Make sure these exist in your child modal component
	@HostBinding('attr.aria-labelledby') labelledBy = 'dialog-title';
	@HostBinding('attr.aria-describedby') describedby = 'dialog-description';

	@Input()
	@HostBinding('attr.data-size')
	size: 'default' | 'medium' | 'large' | 'full' = 'default';

	@HostBinding('attr.modal-mobileFullHeight')
	@Input()
	mobileFullHeight: Boolean = false;

	@Output() closeEmitter: EventEmitter<any> = new EventEmitter();
	@Output() actionEmitter: EventEmitter<any> = new EventEmitter();

	protected constructor(public modalOverlayService: ModalOverlayService) {}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		// tslint:disable-next-line: deprecation
		if (event.keyCode === ESCAPE) {
			this.closeModal();
		}
	}

	ngOnInit() {
		this.modalOverlayService.state$.subscribe((m) => {
			this.modal = m.modal;
		});
	}

	closeModal() {
		this.modal.close();
	}
}
