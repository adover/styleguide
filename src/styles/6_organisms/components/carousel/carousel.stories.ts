import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { centered } from '@storybook/addon-centered/angular';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CTA } from '../../../model';
import { ModalOverlayService, WINDOW_PROVIDERS } from '../../../services';
import { StyleGuideConfig } from '../../../styleguide.config';
import { StyleguideModule } from '../../../styleguide.module';
import { ProductModule } from '@woolworthsnz/product/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockEachProductList } from '@woolworthsnz/product/src/lib/components/stamp/mockProductList';

const hero: CTA = {
	image: {
		src: 'https://picsum.photos/224/476',
		alt: 'I am the ALT tag',
	},
	action: {
		title: 'Call to action',
		link: 'http://www.google.com',
	},
};

const products = mockEachProductList.slice(0, 13);

const deliverySaver: CTA = {
	image: { src: 'assets/images/delivery-saver.jpg', alt: 'Delivery Saver' },
	action: { title: 'Find out more', link: 'http://www.google.com' },
	linkText: 'Delivery saver - find out more',
	content: 'Save more with a delivery saver',
};

storiesOf('Organisms|Carousel', module)
	.addDecorator(
		moduleMetadata({
			imports: [BrowserAnimationsModule, StyleguideModule, ProductModule, RouterTestingModule, HttpClientTestingModule],
			providers: [
				WINDOW_PROVIDERS,
				ModalOverlayService,
				{
					provide: StyleGuideConfig,
					useValue: {},
				},
			],
		})
	)
	.addDecorator(centered)
	.add('Standard Carousel', () => ({
		props: {
			products,
		},
		template: `<cdx-carousel>
        <product-grid cdxCarousel [products]="products"></product-grid>
      </cdx-carousel>
      <cdx-svg-definitions></cdx-svg-definitions>`,
	}))
	.add('Carousel with left hand hero', () => ({
		props: {
			hero,
			products,
		},
		template: `
      <cdx-carousel [hero]="hero">
        <product-grid cdxCarousel [products]="products"></product-grid>
      </cdx-carousel>
      <cdx-svg-definitions></cdx-svg-definitions>`,
	}))
	.add('Carousel with delivery saver', () => ({
		props: {
			hero,
			products: [deliverySaver, ...products],
		},
		template: `
      <cdx-carousel [hero]="hero">
        <product-grid cdxCarousel [products]="products"></product-grid>
      </cdx-carousel>
      <cdx-svg-definitions></cdx-svg-definitions>`,
	}));
