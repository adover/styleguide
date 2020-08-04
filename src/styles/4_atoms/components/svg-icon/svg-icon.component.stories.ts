import { centered } from '@storybook/addon-centered/angular';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { SvgIconComponent } from './svg-icon.component';
import { SvgDefinitionsComponent } from '../svg-definitions/svg-definitions.component';
import { SVGIcon } from '../svg-definitions/SVGIcon';

storiesOf('Atoms|SVG Icon', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('SVG Icon', () => {
		const icons = Object.values(SVGIcon);

		const selector = select('Icons', icons, icons[0]);

		return {
			moduleMetadata: {
				declarations: [SvgIconComponent, SvgDefinitionsComponent],
			},
			template: `
        <cdx-svg-definitions></cdx-svg-definitions>
        <cdx-svg-icon fill="green" [name]="name">
        </cdx-svg-icon>`,
			props: {
				name: selector,
			},
		};
	})
	.add('Inherit color', () => {
		const icons = Object.values(SVGIcon);

		const selector = select('Icons', icons, icons[0]);

		return {
			moduleMetadata: {
				declarations: [SvgIconComponent, SvgDefinitionsComponent],
			},
			template: `
					<cdx-svg-definitions></cdx-svg-definitions>
					<style>
						.demoSvg {
							display:flex;
							justify-content: center;
							align-items:center;
							color: green;
						}
						.demoSvg:hover {
							color: red;
						}
					</style>
					<a href="#" class="demoSvg">This demonstrates an inline svg inheriting color. 
					<cdx-svg-icon fill="currentColor" [name]="name">
					
					</cdx-svg-icon></a>`,
			props: {
				name: selector,
			},
		};
	});
