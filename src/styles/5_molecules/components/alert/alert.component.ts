import { SVGIcon } from '../../../4_atoms/components/svg-definitions/SVGIcon';
import { ValidationError } from '../../../model/validationError';
import { AlertType } from '../../../ui-models';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'cdx-alert, [cdxAlert]',
	template: `
		<div
			class="alert"
			[attr.data-withmargin]="withMargin"
			[attr.data-fullwidth]="fullwidth"
			[attr.labelledBy]="alertLabelId"
			[attr.describedBy]="alertDescriptionId"
			[attr.data-type]="type"
			[attr.role]="role"
			[class.alert--candismiss]="candismiss"
			*ngIf="showAlert"
		>
			<cdx-svg-icon class="alert-icon" [name]="icon" [fill]="type" *ngIf="icon"></cdx-svg-icon>

			<div class="alert-content">
				<span #content class="alert-label" id="{{ alertLabelId }}">
					<ng-container *ngIf="title; else fallback">{{ title }} </ng-container>
					<ng-template #fallback>{{ fallbackMessage }}</ng-template>
				</span>

				<div *ngIf="description" id="{{ alertDescriptionId }}" class="alert-description">
					<span *ngFor="let item of description">
						<ng-container *ngIf="item?.message; else descriptionTemplate">
							<ng-container *ngIf="item?.field">{{ item.field }}: </ng-container>{{ item?.message }}
						</ng-container>

						<ng-template #descriptionTemplate>
							<span [innerHTML]="item"></span>
						</ng-template>
					</span>
				</div>

				<ng-content select="[alertLink]"></ng-content>
			</div>

			<div *ngIf="showCta" class="alert-cta">
				<ng-content select="[cta]"></ng-content>
			</div>
			<button aria-label="Dismiss alert" class="alert-closeBtn" *ngIf="candismiss" (click)="closeAlert()"></button>
		</div>
	`,
	styleUrls: ['./alert.component.scss'],

	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
	_alertType: AlertType = AlertType.info;
	_description: string[] | ValidationError[];

	_icon: SVGIcon | false = SVGIcon.Alert;

	dismissed = false;

	get showAlert() {
		return !this.dismissed;
	}

	get role() {
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role#Notes
		return this.candismiss ? 'alertdialog' : 'alert';
	}

	get type() {
		return this._alertType;
	}

	@Input() set type(alertType: AlertType) {
		this._alertType = alertType ? alertType : AlertType.error;
	}

	get icon() {
		return this._icon;
	}

	@Input() set icon(icon: SVGIcon | false) {
		this._icon = icon;
	}

	@Input() showCta = false;

	@Input() title: string;

	@HostBinding('attr.cananimate')
	@Input()
	animate = true;

	// not camelCase due to using this as a custom element
	@Input()
	fullwidth = false;

	get description() {
		return this._description;
	}

	@Input() set description(description: string | string[] | ValidationError[]) {
		if (!description) return;
		this._description = [].concat(description);
	}

	@Input()
	candismiss: Boolean = false;

	@Input() withMargin = true;

	@ViewChild('content', { static: true }) content: ElementRef;

	alertLabelId = 'alertLabel';
	alertDescriptionId: string;

	alertTypes = AlertType;
	fallbackMessage =
		'Sorry an error has occurred. If you continue to receive these errors please contact our Customer Service Team on 0800 40 40 40';

	constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.alertDescriptionId = this.description && this.description.length ? 'alertDescription' : undefined;
	}

	closeAlert() {
		this.dismissed = true;

		this.cdr.markForCheck();
	}

	hasMessage = () => {
		return (
			this.content.nativeElement.childNodes.length > 0 &&
			Boolean(this.content.nativeElement.childNodes[0].textContent.trim())
		);
	};
}
