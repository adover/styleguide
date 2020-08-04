import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { LogoComponent } from './logo.component';

storiesOf('Atoms|Logo', module)
	.addDecorator(withKnobs)
	.add('Logo', () => {
		const types = {
			landscape: 'landscape',
			portrait: 'portrait',
			wapple: 'wapple',
		};
		const type = select('type', types, 'landscape');

		const backgrounds = {
			dark: 'dark',
			light: 'light',
		};

		const background = select('background', backgrounds, 'light');

		return {
			moduleMetadata: {
				declarations: [LogoComponent],
			},
			template: `<div class="myLogo"><cdx-logo [type]="type" [background]="background"></cdx-logo></div>`,
			props: {
				type,
				background,
			},
			styles: [
				`.myLogo {
            width: 300px;
            height:200px;
            background-color: #bbb;
            display: flex;
            align-items: center;
            justify-content: center;
        }`,
			],
		};
	});
