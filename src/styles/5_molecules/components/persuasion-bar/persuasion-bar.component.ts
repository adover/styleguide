import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

export class PersuasionBarElement {
	icon: string;
	url: string;
	text: string;
}

/**
 * @description PersuasionBar
 * @export
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'cdx-persuasion-bar',
	template: `
		<div class="persuasionBar-track" [attr.data-items]="itemCountLength" *ngIf="items">
			<ul class="persuasionBar-list">
				<li class="persuasionBar-item" *ngFor="let item of items">
					<a href="{{ item.url }}" cdxLegacyNoAjax>
						<span
							role="img"
							[attr.data-icon-color]="'light'"
							[attr.data-icon]="item.icon"
							class="persuasionBar-itemImage"
						></span>
						{{ item.text }}
					</a>
				</li>
			</ul>
		</div>
	`,
	styleUrls: ['./persuasion-bar.component.scss'],
})
export class PersuasionBarComponent implements OnInit {
	_items: PersuasionBarElement[];

	get itemCountLength() {
		return this._items.length;
	}

	@Input() set items(items: PersuasionBarElement[]) {
		this._items = items;
	}
	get items() {
		return this._items;
	}

	constructor() {}

	ngOnInit() {
		if (!this.items) console.warn('[Persuasion Bar]: No items passed through. Bar will not render');
	}
}
