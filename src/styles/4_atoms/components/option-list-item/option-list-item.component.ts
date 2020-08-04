import { Highlightable } from '@angular/cdk/a11y';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'cdx-option-list-item',
	template: `
		<li [class.disabled]="disabled" [ngClass]="{ disabled: disabled, noPadding: noPadding }">
			<ng-content></ng-content>
		</li>
	`,
	styleUrls: ['./option-list-item.component.scss'],
})
export class OptionListItemComponent implements Highlightable {
	@Input() disabled = false;
	@Input() itemLabel: string;
	@Input() noPadding = false;
	private active = false;

	@HostBinding('class.active')
	get isActive() {
		return this.active;
	}

	setActiveStyles() {
		this.active = true;
	}

	setInactiveStyles() {
		this.active = false;
	}

	getLabel() {
		return this.itemLabel || '';
	}
}
