import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'cdx-image, [cdxImage]',
	template: `
		<ng-content></ng-content>
	`,
})
export class ImageComponent implements OnInit {
	@Input() imageFolder: string;

	constructor() {}

	ngOnInit() {}
}
