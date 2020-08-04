import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'cdx-accordion-item',
	template: `
		<header class="accordion-header">
			<h5 class="mb-0">
				<button
					class="accordion-button btn btn-link"
					data-toggle="close"
					[attr.aria-expanded]="isOpened"
					(click)="toggle()"
				>
					{{ heading }}<i class="accordion-toggleIcon" [class.active]="isOpened"></i>
				</button>
			</h5>
		</header>
		<div class="accordion-item" [class.active]="isOpened" [attr.aria-labelledby]="heading">
			<div class="body"><ng-content></ng-content></div>
		</div>
	`,
	styleUrls: ['./accordion-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
	@Input() heading: string;
	@Input() isOpened = false;
	@Output() headingButtonToggleEmitter: EventEmitter<boolean> = new EventEmitter();

	constructor(private cdr: ChangeDetectorRef) {}

	toggle() {
		this.isOpened = !this.isOpened;

		this.headingButtonToggleEmitter.emit(this.isOpened);

		this.cdr.markForCheck();
	}
}
