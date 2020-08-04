import { centered } from '@storybook/addon-centered/angular';
import { storiesOf } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessIconComponent } from '../success-icon/success-icon.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

storiesOf('Atoms|Button group', module)
	.addDecorator(centered)
	.add('default', () => ({
		moduleMetadata: {
			imports: [],
			declarations: [ButtonGroupComponent, ButtonComponent, LoadingComponent, SuccessIconComponent, SvgIconComponent],
		},
		template: `
    <div style="width: 250px; background: white; padding: 1.5rem">
    <cdx-button-group>
     <button
        #decrementButton
        cdxButton
      >
        Minus
      </button>
      <button
        #incrementButton
        cdxButton
      >
        Plus
      </button>
      </cdx-button-group>
    </div>`,
	}));
