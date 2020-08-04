import { storiesOf } from '@storybook/angular';
import { ApiService, ModalOverlayService, StyleguideModule, WINDOW_PROVIDERS } from '@woolworthsnz/styleguide';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductModule, ProductService } from '@woolworthsnz/product';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { centered } from '@storybook/addon-centered/angular';

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

storiesOf('Molecules | Slotted Modal', module)
	.addDecorator(centered)
	.add('default', () => {
		return {
			moduleMetadata: ModalComponentMetadata,
			template: `
				<cdx-slotted-modal>
					<h1 modal-header>I'm in the header</h1>
					<div modal-content>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
						<p>I'm content</p>
					</div>
					<button cdxButton [fullWidth]="true" fillStyle="primary" modal-footer-primary>I'm primary</button>
					<button cdxButton [fullWidth]="true" fillStyle="secondary" modal-footer-secondary>I'm secondary</button>
				</cdx-slotted-modal>
				<cdx-svg-definitions></cdx-svg-definitions>
			`,
		};
	});
