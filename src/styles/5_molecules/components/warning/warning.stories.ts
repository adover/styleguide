import { centered } from '@storybook/addon-centered/angular';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { WarningComponent } from './warning.component';
import { SvgIconComponent } from '../../../4_atoms/components';
import { AlertComponent } from '../alert/alert.component';

export const WarningComponentMetadata = {
	declarations: [AlertComponent, WarningComponent, SvgIconComponent],
};

storiesOf('Molecules| Warning', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('default', () => ({
		moduleMetadata: WarningComponentMetadata,
		component: WarningComponent,
		props: {},
		template: `
      <cdx-warning></cdx-warning>
    `,
	}));
