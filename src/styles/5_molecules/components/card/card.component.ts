import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PaddingSize } from '../../../ui-models';

export class Card {
	title: string;
	url?: string;
	text?: string;
}

// TODO: This needs refactoring to be like the cdx-svg-icon component
@Component({
	selector: 'cdx-card, [cdxCard]',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	@HostBinding('class.card') mainClass = true;

	@HostBinding('attr.card-padding')
	@Input()
	padding: PaddingSize = PaddingSize.Default;

	@HostBinding('attr.card-center')
	@Input()
	center = false;

	@HostBinding('attr.card-rounded')
	@Input()
	roundedCorners: false | true | 'large' | 'default' = false;

	@Input() url: string;
	@Input() title: string;
	@Input() text: string;

	constructor() {}

	ngOnInit() {}
}
