import { color, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { LoadingComponent } from './loading.component';

storiesOf('Atoms|Loading', module)
	.addDecorator(withKnobs)
	.add('Loading', () => {
		const fill = 'dark';
		return {
			moduleMetadata: {
				declarations: [LoadingComponent],
			},
			template: `<div><cdx-loading [fill]="fill"></cdx-loading></div>`,
			props: {
				fill,
			},
		};
	});
