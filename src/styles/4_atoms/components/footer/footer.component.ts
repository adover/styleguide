import { Component, OnInit } from '@angular/core';

/**
 * @description
 * @export
 */
@Component({
	selector: 'cdx-footer',
	template: `
		<ng-content></ng-content>
	`,
	// styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
