import { THEME_CONSTANTS } from '../../../1_settings/theme';
import { Component, Input, HostBinding, ViewChild, AfterContentChecked } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'cdx-slide-panel',
	template: `
		<div #panel>
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./slide-panel.component.scss'],
	animations: [
		trigger('slideInOut', [
			state(
				'close',
				style({
					height: '0',
				})
			),
			state(
				'void',
				style({
					height: '0',
				})
			),
			state(
				'open',
				style({
					height: '*',
				})
			),
			transition('* => close', animate(`${THEME_CONSTANTS.transitions.default} ease-in`)),
			transition('* <=> *', animate(`${THEME_CONSTANTS.transitions.default} ease-in`)),
		]),
	],
})
export class SlidePanelComponent implements AfterContentChecked {
	private panelVisibility = false;

	@ViewChild('panel', { static: true }) content: any;

	@HostBinding('@slideInOut') get animation() {
		return {
			value: this.togglePanel(),
			params: { viewChildHeight: this.viewChildHeight },
		};
	}

	@Input() set showPanel(value: boolean) {
		this.panelVisibility = value;
		this.setPanelHeight();
		this.togglePanel();
	}

	get showPanel(): boolean {
		return this.panelVisibility;
	}

	viewChildHeight = 0;

	constructor() {}

	setPanelHeight() {
		if (this.content.nativeElement) {
			this.viewChildHeight = this.content.nativeElement.clientHeight;
		}
	}

	ngAfterContentChecked() {
		this.setPanelHeight();
	}

	togglePanel() {
		return this.showPanel ? this.viewChildHeight : 'close';
	}
}
