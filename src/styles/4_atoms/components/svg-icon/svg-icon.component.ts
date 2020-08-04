import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'cdx-svg-icon',
	template: `
		<svg
			version="1.1"
			viewbox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<use attr.xlink:href="#{{ name }}"></use>
		</svg>
	`,
	styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent {
	@Input()
	name: string;

	@HostBinding('attr.display')
	@Input()
	display: 'inline' | 'block' = 'block';

	@HostBinding('attr.fill')
	@Input()
	fill: 'currentColor' | 'dark' | 'light' | 'green' | 'alert' | 'warning';

	@HostBinding('attr.size')
	@Input()
	size: 'default' | 'small' | 'large' | 'extra-small';
}
