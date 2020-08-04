import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @description
 * @export
 */
@Component({
	selector: 'cdx-section',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
	@Input() alignment: 'left' | 'centre' | 'right';
	@Input() background: 'grey' | 'white';
	@Input() fixed: boolean;
	@Input() formGroup: FormGroup;
	@Input() padding: 'none' | 'default' | 'medium' | 'large' = 'default';

	@Input() class = '';
	@HostBinding('class')
	get hostClasses(): string {
		return [
			this.class,
			this.alignmentClass,
			this.backgroundColourClass,
			this.fixedWidthClass,
			this.paddingClass,
			'section',
		].join(' ');
	}

	get alignmentClass() {
		return this.alignment && `section--align${this.alignment.charAt(0).toUpperCase() + this.alignment.substr(1)}`;
	}

	get backgroundColourClass() {
		return this.background && `section--bg${this.background.charAt(0).toUpperCase() + this.background.substr(1)}`;
	}

	get fixedWidthClass() {
		return this.fixed && 'section--fixed';
	}

	get paddingClass() {
		return this.padding && `section--padding${this.padding.charAt(0).toUpperCase() + this.padding.substr(1)}`;
	}
}
