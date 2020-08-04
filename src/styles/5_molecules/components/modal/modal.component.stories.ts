import { Overlay } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { ProductService, ProductModule } from '@woolworthsnz/product';
import { ApiService, WINDOW_PROVIDERS } from '../../../services';
import { ModalOverlayService } from '../../../services/modal-overlay.service';
import { StyleguideModule } from '../../../styleguide.module';

export const ModalComponentMetadata = {
	declarations: [],
	providers: [ApiService, CurrencyPipe, DecimalPipe, ModalOverlayService, ProductService, Overlay, WINDOW_PROVIDERS],
	imports: [
		BrowserAnimationsModule,
		HttpClientTestingModule,
		PortalModule,
		ReactiveFormsModule,
		RouterTestingModule,
		StyleguideModule,
		ProductModule,
	],
};

storiesOf('Molecules| Modal', module)
	.addDecorator(centered)
	.addParameters({ options: { selectedPanel: 'storybook/knobs/panel' } })
	.addDecorator(withKnobs)
	.add('Shopper Notes', () => {
		return {
			moduleMetadata: ModalComponentMetadata,
			template: `
        <cdx-modal (closeEmitter)="onClose($event)">
          <product-shopper-notes></product-shopper-notes>
        </cdx-modal>`,
			props: {
				onClose: action('onClose'),
			},
		};
	})
	.add('Error', () => {
		return {
			moduleMetadata: ModalComponentMetadata,
			template: `
        <cdx-modal [center]="true" (closeEmitter)="onClose($event)">
          <cdx-generic-modal></cdx-generic-modal>
        </cdx-modal>
        <cdx-svg-definitions></cdx-svg-definitions>`,
			props: {
				onClose: action('onClose'),
			},
		};
	});
