import { Component, HostBinding, Input } from '@angular/core';

/**
 * @description For a large heading at the start of a page or inside a masthead component.
 * @usage Use this on it's own in the document flow and outside of section logic.
 * @export
 */
@Component({
	selector: 'cdx-page-heading',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./page-heading.component.scss'],
})
export class PageHeadingComponent {
	@HostBinding('attr.role') role = 'heading';
	@HostBinding('attr.aria-level') level = '1';

	@HostBinding('class')
	get hostClasses(): string {
		return ['pageHeading'].join(' ');
	}

	/**
	 * Treats the component like a section and gives it vertical spacing values
	 */
	@HostBinding('attr.spacing')
	@Input()
	spacing: 'default' | 'medium' | 'large' = 'default';
}
