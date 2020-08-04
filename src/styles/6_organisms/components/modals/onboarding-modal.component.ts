import { ESCAPE } from '@angular/cdk/keycodes';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import {
	ModalOverlayRef,
	WINDOW,
	CustomWindow,
	ModalOverlayService,
	LocalStorageService,
	ModalOverlayState,
} from '../../../services';

//Useful numbers for setting modal positioning
export enum ModalSizes {
	defaultSizeMaxWidthInPixels = 304, //from base-modal.scss
	modalCutoutMarginInPixels = 20,
	pointerMarginInPixels = 16,
}

export enum ModalStorageKeys {
	pcs = 'countdown-pcsOnboard',
	pies = 'countdown-piesOnboard',
}

@Component({
	selector: 'onboarding-modal',
	templateUrl: './onboarding-modal.component.html',
	styleUrls: ['./onboarding-modal.component.scss'],
})
export class OnboardingModal implements OnInit {
	modal: ModalOverlayRef;
	pointerSize: number = 12;
	padding: number = 16;

	@Input() target: ElementRef;
	@Input() size: 'default' | 'medium' | 'large' | 'full' = 'default';
	@Input() mode: 'circle' | 'rect' = 'circle';
	@Input() cutout: boolean;
	@Input() modalLeft: number;
	@Input() modalTop: number;
	@Input() cutoutLeft: number;
	@Input() cutoutTop: number;
	@Input() cutoutWidth: number;
	@Input() cutoutHeight: number;
	@Input() radius: number;
	@Input() storageKey: string;

	constructor(
		@Inject(WINDOW) private window: CustomWindow,
		private modalOverlayService: ModalOverlayService,
		private localStorageService: LocalStorageService
	) {}

	get bgWidth(): number {
		return this.window.innerWidth;
	}

	get bgHeight(): number {
		return this.window.innerHeight;
	}

	get pointerLeftPos(): number {
		return this.mode === 'circle' ? this.radius - this.pointerSize : ModalSizes.pointerMarginInPixels;
	}

	ngOnInit(): void {
		this.modalOverlayService.state$.subscribe((m) => {
			this.modal = m.modal;
		});
	}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		if (event.keyCode === ESCAPE) {
			this.closeModal();
		}
	}

	closeModal() {
		if (this.storageKey) {
			this.localStorageService.setItem(this.storageKey, 'true');
		}
		this.modalOverlayService.setState(new ModalOverlayState());
		this.modal.close();
	}
}
