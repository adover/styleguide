import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { InputComponent, InputErrorComponent, InvalidTypeDirective } from '@woolworthsnz/form';
import { SlidePanelComponent } from './slide-panel.component';
import { WINDOW_PROVIDERS, APP_SETTINGS_PROVIDER, ApiService } from '../../../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

storiesOf('Molecules|Slide Panel', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.add('Slide panel', () => {
		const showPanel = boolean('showPanel', true);
		const formGroup = new FormGroup({
			companyName: new FormControl(),
		});
		return {
			moduleMetadata: {
				declarations: [SlidePanelComponent, InputComponent, InputErrorComponent, InvalidTypeDirective],
				imports: [ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
				providers: [APP_SETTINGS_PROVIDER, WINDOW_PROVIDERS, ApiService],
			},
			template: `
      <div [formGroup]="formGroup">
        <cdx-slide-panel [showPanel]="showPanel">
          <form-input
            autocomplete="organization"
            formControlName="companyName"
            maxlength="65"
            required
            [tabindex]="showPanel ? 0 : -1"
          >
            <label for="companyName" label>
              Business name
            </label>
            <form-input-error validation control="companyName">
              <p
                [cdxInvalidType]="'required'"
                i18n="@@register-businessNameRequiredErrorMessage"
              >
                Please enter your business name.
              </p>
            </form-input-error>
          </form-input>
        </cdx-slide-panel>
      </div>
      `,
			props: {
				showPanel,
				formGroup,
			},
		};
	});
