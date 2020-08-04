import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { SuccessIconComponent } from './success-icon.component';
import { SvgDefinitionsComponent } from '../svg-definitions/svg-definitions.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

storiesOf('Atoms|Success Icon', module)
	.addDecorator(centered)
	.add('Default', () => ({
		moduleMetadata: {
			declarations: [SuccessIconComponent, SvgIconComponent, SvgDefinitionsComponent],
			imports: [BrowserAnimationsModule],
		},
		template: `<cdx-svg-definitions></cdx-svg-definitions>
      <div style="width:32px; height: 32px; background: #272727; position: relative"><cdx-success-icon></cdx-success-icon></div>`,
	}));
