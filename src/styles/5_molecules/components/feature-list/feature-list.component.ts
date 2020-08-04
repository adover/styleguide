import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FeatureListItem } from '../feature-list-item/feature-list-item.component';

@Component({
	selector: 'cdx-feature-list',
	template: `
		<ng-container *ngFor="let item of items; let index">
			<cdx-feature-list-item [item]="item" [index]="index"></cdx-feature-list-item>
		</ng-container>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
	@Input() items: FeatureListItem[];

	constructor() {}

	ngOnInit() {
		if (!this.items) console.warn('[FeatureListComponent]: No items passed. Will not render.');
	}
}
