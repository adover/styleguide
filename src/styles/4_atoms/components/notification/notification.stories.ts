import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { NotificationComponent } from './notification.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

storiesOf('Atoms|Notification', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.addParameters({ options: { selectedPanel: 'storybook/knobs/panel' } })
	.add('default', () => {
		const canShow = boolean('Show notification', false);
		const content = text('Content', 'Closing soon!');

		return {
			moduleMetadata: {
				imports: [BrowserAnimationsModule],
				declarations: [NotificationComponent, SvgIconComponent],
			},
			template: `
      <div style="width: 250px; background: white; padding: 1.5rem">
        <p>Select 'Show notification' under the knobs tab to view notification</p>
        <cdx-notification [canShow]="canShow" [content]="content">
        </cdx-notification>
      </div>
    `,
			props: {
				canShow,
				content,
			},
		};
	});
