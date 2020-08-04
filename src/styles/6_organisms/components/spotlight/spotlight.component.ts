import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Card } from '../../../5_molecules/components/card/card.component';
// import { Card } from '../../../5_molecules/components';

@Component({
	selector: 'cdx-spotlight',
	template: `
		<ng-container *ngFor="let c of cards; trackBy: getCardIndex">
			<cdx-card url="{{ c.url }}" title="{{ c.title }}" text="{{ c.text }}">
				<img src="https://picsum.photos/320/300" alt="" image />
			</cdx-card>
		</ng-container>
	`,
	styleUrls: ['./spotlight.component.scss'],
})
export class SpotlightComponent implements OnInit {
	@HostBinding('class.spotlight') mainClass = true;

	@Input() cards: Card[];

	constructor() {}

	ngOnInit() {}

	getCardIndex(index) {
		return index;
	}
}
