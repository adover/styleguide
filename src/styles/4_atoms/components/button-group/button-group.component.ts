import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'cdx-button-group',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./button-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
