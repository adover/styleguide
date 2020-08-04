import { Component, Input, OnInit } from '@angular/core';

export class FeatureListItem {
	imagePosition: 'above' | 'below;';
	icon?: string;
	text: string;
}

@Component({
	selector: 'cdx-feature-list-item',
	template: `
		<ng-container *ngIf="item">
			<ng-container *ngIf="displayImageAbove(item.imagePosition); then above; else below"></ng-container>

			<ng-template #above>
				<ng-container *ngTemplateOutlet="image"></ng-container>
			</ng-template>

			<span id="feature-{{ index }}" i18n="Feature List Item Number {{ index }}Text@@featureListItem-text">{{
				item.text
			}}</span>

			<ng-template #below>
				<ng-container *ngTemplateOutlet="image"></ng-container>
			</ng-template>
			<ng-template #image>
				<span role="img" attr.aria-labelledby="feature-{{ index }}" attr.data-icon="{{ item.icon }}"></span>
			</ng-template>
		</ng-container>
	`,
	styleUrls: ['./feature-list-item.component.scss'],
})
export class FeatureListItemComponent implements OnInit {
	@Input() index: number;
	@Input() item: FeatureListItem;

	constructor() {}

	ngOnInit() {}

	displayImageAbove = (position: FeatureListItem['imagePosition']): boolean => position === 'above';
}
