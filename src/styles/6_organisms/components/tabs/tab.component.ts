import { Component, Input, ChangeDetectionStrategy, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { TabsComponent } from './tabs.component';

/**
 * @description Singular Tab component
 * @export
 */
@Component({
	selector: 'cdx-tab',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container>
			<ng-content></ng-content>
		</ng-container>
	`,
	styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
	_active: boolean;
	_hidden: boolean;

	@HostBinding('attr.aria-disabled') @Input() disabled = false;
	@HostBinding('attr.aria-expanded') @Input() set active(a: boolean) {
		this._active = a;
		this.hidden = !a;
	}

	get active() {
		return this._active;
	}

	@HostBinding('attr.aria-hidden') hidden: boolean;

	@HostBinding('attr.aria-label') label = 'Label';
	@HostBinding('attr.aria-labelledby') labelledBy = 'labelledBy';
	@HostBinding('id') id = '';
	@HostBinding('attr.role') role = 'tabpanel';

	@Input() heading: string;
	@Input() href: string;
	@Input() set icon(i: any) {
		console.error('[TabComponent]  Icon not implemented');
	}

	constructor(private tabs: TabsComponent, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.tabs.registerTab(this);
	}
}
