import { storiesOf, moduleMetadata } from '@storybook/angular';
import { APP_SETTINGS_PROVIDER, AppSettingsService, WINDOW_PROVIDERS, ApiService } from '../../../services';
import { withKnobs } from '@storybook/addon-knobs';
import { centered } from '@storybook/addon-centered/angular';
import { StyleguideModule } from '../../../styleguide.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

storiesOf('Organisms | Olive Roundel', module)
	.addDecorator(
		moduleMetadata({
			declarations: [],
			providers: [APP_SETTINGS_PROVIDER, AppSettingsService, ApiService, WINDOW_PROVIDERS],
			imports: [StyleguideModule, HttpClientTestingModule],
		})
	)
	.addDecorator(withKnobs)
	.addDecorator(centered)
	.add('default', () => ({
		template: `<cdx-olive-roundel></cdx-olive-roundel>`,
	}));
