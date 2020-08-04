import { Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

interface AccordionItem {
	id: number;
	heading: string;
	content: string;
}
@Component({
	selector: 'cdx-accordion',
	styleUrls: ['./accordion.component.scss'],
	template: `
		<ng-container *ngIf="items">
			<cdx-accordion-item *ngFor="let item of items; trackBy: trackByFn" [heading]="item.heading">
				<div [innerHTML]="item.content | sanitizeHtml"></div>
			</cdx-accordion-item>
		</ng-container>
		<ng-content></ng-content>
	`,
})
export class AccordionComponent {
	@HostBinding('class.accordion') class = true;
	@Input() items: AccordionItem[];

	trackByFn = (_, item: any) => item.heading;
}
