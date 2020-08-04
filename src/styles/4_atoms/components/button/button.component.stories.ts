import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonState } from '../../../model';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessIconComponent } from '../success-icon/success-icon.component';
import { SvgDefinitionsComponent } from '../svg-definitions/svg-definitions.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

storiesOf('Atoms|Button', module)
	.addDecorator(centered)
	.addDecorator(withKnobs)
	.addParameters({ options: { selectedPanel: 'storybook/knobs/panel' } })
	.add('Button', () => {
		const fullWidth = boolean('fullWidth', false);
		const buttonSizes = {
			default: 'default',
			large: 'large',
		};
		const fillStyles = {
			Primary: 'primary',
			'Primary Flat Inverse': 'primaryFlatInverse',
			'Primary Outline': 'outline',
			Link: 'link',
			Warn: 'warn',
			'Primary Flat': 'flat',
			Secondary: 'secondary',
			'Secondary Flat': 'secondaryFlat',
			'Secondary Outline': 'secondaryOutline',
			Tertiary: 'tertiary',
			'Tertiary Flat': 'tertiaryFlat',
		};

		const sizes = ['extra-small', 'small', 'default'];

		const state = {
			default: ButtonState.default,
			busy: ButtonState.busy,
			completed: ButtonState.completed,
			errored: ButtonState.errored,
		};

		const size = select('size', buttonSizes, 'large');
		const fillStyle = select('fillStyle', fillStyles, 'primary');
		const disabled = boolean('disabled', false);
		const iconStart = boolean('Icon at start', false);
		const iconSize = select('Icon size', sizes, 'default');
		const iconEnd = boolean('Icon at end', false);
		const buttonState = select('state', state, ButtonState.default);

		return {
			moduleMetadata: {
				declarations: [
					LoadingComponent,
					ButtonComponent,
					SuccessIconComponent,
					SvgIconComponent,
					SvgDefinitionsComponent,
				],
				imports: [BrowserAnimationsModule],
			},
			template: `
      <cdx-svg-definitions></cdx-svg-definitions>

    <button
    [fullWidth]="fullWidth"
    [size]="size"
      [disabled]="disabled"
      [endSlotActive]="iconEnd"
      [endSlotSize]="iconSize"
      [fillStyle]="fillStyle"
      [startSlotActive]="iconStart"
      [startSlotSize]="iconSize"
      cdxButton>
          <cdx-svg-icon fill="dark" name="shopping-list" start [size]="iconSize" *ngIf="iconStart"></cdx-svg-icon>
          Look at my start icon <ng-container completed>Added</ng-container>
          <cdx-svg-icon fill="dark" name="chevron-bottom" end [size]="iconSize" *ngIf="iconEnd"></cdx-svg-icon>
      </button>
`,
			props: {
				fullWidth,
				buttonState,
				size,
				fillStyle,
				disabled,
				iconStart,
				iconSize,
				iconEnd,
			},
		};
	});
