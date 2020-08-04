import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ButtonComponent } from '../../../4_atoms/components';
import {
	SvgIconComponent,
	SvgDefinitionsComponent,
	AlertComponent,
	APP_SETTINGS_PROVIDER,
} from '@woolworthsnz/styleguide';

storiesOf('Molecules| Alert', module)
	.addDecorator(withKnobs)
	.add('default', () => {
		const canDismiss = boolean('Dismissable?', true);
		const alertTypes = {
			info: 'info',
			success: 'success',
			warning: 'warning',
			error: 'error',
		};
		const alertType = select('Alert Type', alertTypes, 'error');
		const alertTitle = text('Alert Title', undefined);
		const alertDescription = text('Alert Description', undefined);
		const showCta = boolean('Show CTA on right?', true);

		return {
			moduleMetadata: {
				declarations: [
					APP_SETTINGS_PROVIDER,
					AlertComponent,
					SvgIconComponent,
					SvgDefinitionsComponent,
					ButtonComponent,
				],
			},
			template: `
        <cdx-alert [candismiss]="canDismiss" [type]="alertType" [title]="alertTitle" [description]="alertDescription" [showCta]="showCta">
          <button cdxButton fillStyle="secondary" cta>Click click click</button>
        </cdx-alert>
        <cdx-svg-definitions></cdx-svg-definitions>`,
			props: {
				alertType,
				canDismiss,
				alertDescription,
				alertTitle,
				showCta,
			},
		};
	});
