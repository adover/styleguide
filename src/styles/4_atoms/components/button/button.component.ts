import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { ButtonState } from '../../../ui-models';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';

const BUSY_LOADER_HIDE_TIME = 300;

// TODO: Migrate to using these combos
export enum ButtonFillColour {
	Primary,
	PrimaryInverse,
	Secondary,
	SecondaryInverse,
	Disabled,
	Warn,
}

export enum ButtonFillStyle {
	Fill,
	Flat,
	Outline,
}

@Component({
	selector: 'cdx-button, [cdxButton]',
	template: `
		<i class="button-icon--start" #slotStart> <ng-content select="[start]"></ng-content> </i>

		<ng-container *ngIf="!isCompleted">
			<ng-content></ng-content>
		</ng-container>

		<ng-container *ngIf="isCompleted">
			<ng-content select="[completed]"></ng-content>
		</ng-container>

		<i class="button-icon--end" #slotEnd>
			<cdx-loading *ngIf="isBusy"></cdx-loading>

			<cdx-success-icon *ngIf="isCompleted" (animationCompleteEmitter)="animationCompleted()"></cdx-success-icon>

			<ng-content select="[end]"></ng-content>
		</i>
	`,
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnDestroy, FocusableOption {
	startTimer = 0;
	state = ButtonState.default;

	@HostBinding('style.pointer-events') get events() {
		return this.state !== ButtonState.default ? 'none' : 'auto';
	}

	constructor(public el: ElementRef, private cdr: ChangeDetectorRef) {}

	@HostBinding('attr.aria-busy')
	get isBusy() {
		return this.state === ButtonState.busy;
	}

	@HostBinding('attr.data-completed')
	get isCompleted() {
		return this.state === ButtonState.completed;
	}

	@Input() class: string;

	@Input()
	@HostBinding('attr.aria-disabled')
	disabled = false;

	@HostBinding('attr.align')
	@Input()
	align: 'left' | 'center' | 'right' = 'center';

	@HostBinding('attr.fillStyle')
	@Input()
	fillStyle:
		| 'primary'
		| 'primaryFlatInverse'
		| 'outline'
		| 'link'
		| 'flat'
		| 'warn'
		| 'secondary'
		| 'secondaryFlat'
		| 'secondaryOutline'
		| 'tertiary'
		| 'tertiaryFlat' = 'primary';

	@HostBinding('attr.size')
	@Input()
	size: 'default' | 'small' | 'large' = 'default';

	// @HostBinding('attr.marginSize')
	// @Input()
	// marginSize: 'default' | 'small' = 'default';

	@HostBinding('attr.inline')
	@Input()
	inline = false;

	@HostBinding('attr.fullWidth')
	@Input()
	fullWidth = false;

	@Input()
	@HostBinding('class.btn--footer')
	footerButton = false;

	@Output() animationCompletedEmitter: EventEmitter<any> = new EventEmitter();

	// TODO: We should automate the adding of an icon into the button if we want i
	// We would then be able to dictate the colour of it and hover states
	@ViewChild('slotStart', { read: ElementRef, static: true })
	slotStart: ElementRef;
	@ViewChild('slotEnd', { read: ElementRef, static: true })
	slotEnd: ElementRef;

	_endSlotActive: boolean;
	_startSlotActive: boolean;

	// ADD SVG SIZE
	@Input()
	@HostBinding('attr.data-slotend')
	set endSlotActive(a: boolean) {
		this._endSlotActive = a;
	}

	get endSlotActive() {
		return this._endSlotActive;
	}

	@Input()
	@HostBinding('attr.data-slotstart')
	set startSlotActive(a: boolean) {
		this._startSlotActive = a;
	}

	get startSlotActive() {
		return this._startSlotActive;
	}

	@HostBinding('attr.data-slotendsize')
	@Input()
	endSlotSize: 'extra-small' | 'small' | 'default' = 'default';

	@HostBinding('attr.data-slotstartsize')
	@Input()
	startSlotSize: 'extra-small' | 'small' | 'default' = 'default';

	@Input()
	set buttonState(buttonState: ButtonState) {
		switch (buttonState) {
			case ButtonState.busy: {
				this.setBusyState();
				break;
			}

			case ButtonState.completed: {
				this.setCompleteState();
				break;
			}

			case ButtonState.errored:
			case ButtonState.default:
			default: {
				this.setDefaultState();
				break;
			}
		}
	}

	ngOnDestroy(): void {
		return;
	}

	animationCompleted() {
		this.animationCompletedEmitter.emit();
	}

	focus(origin?: FocusOrigin): void {
		this.el.nativeElement.focus();
	}

	setCompleteState() {
		this._endSlotActive = true;
		const timeDifferenceFromStart = Date.now() - this.startTimer;
		if (timeDifferenceFromStart >= BUSY_LOADER_HIDE_TIME) {
			this.setState(ButtonState.completed);
		} else {
			const remainingTime = BUSY_LOADER_HIDE_TIME - timeDifferenceFromStart;

			setTimeout(() => {
				this.setState(ButtonState.completed);
			}, remainingTime);
		}
	}

	setBusyState() {
		this._endSlotActive = true;
		this.startTimer = Date.now();
		this.setState(ButtonState.busy);
	}

	setDefaultState() {
		this._endSlotActive = false;
		this.setState(ButtonState.default);
	}

	setState(state) {
		this.state = state;
		this.cdr.markForCheck();
	}
}
