import { centered } from '@storybook/addon-centered/angular';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CTA } from '../../../model';
import { StyleguideModule } from '../../../styleguide.module';

const cta: CTA = {
	image: {
		src: 'https://picsum.photos/250/250',
		alt: 'I am the ALT tag',
	},
	content: 'Save more with a delivery saver',
	action: {
		title: 'Call to action',
		link: 'http://www.google.com',
	},

	linkText: 'Aria label link text',
};

const ctaFactory = (image, content, action, linkText) => {
	return {
		image: image && cta.image,
		content: content && cta.content,
		action: action && cta.action,
		linkText: linkText && cta.linkText,
	};
};

storiesOf('Molecules|CTA Component', module)
	.addDecorator(
		moduleMetadata({
			imports: [StyleguideModule],
		})
	)
	.addDecorator(centered)
	.add('Floating Caption: Hero image with image, no CTA', () => ({
		props: {
			cta: ctaFactory(true, false, false, false),
		},
		template: `<cdx-cta style="width: 228px; height: 400px" [cta]="cta"></cdx-cta>`,
	}))
	.add('Floating Caption: Hero image with image and CTA', () => ({
		props: {
			cta: ctaFactory(true, false, true, false),
		},
		template: `<cdx-cta style="width: 228px; height: 400px" [cta]="cta"></cdx-cta>`,
	}))
	.add('Flex Caption: Delivery saver', () => ({
		props: {
			cta: ctaFactory(true, true, true, true),
		},
		template: `<cdx-cta style="width: 228px; height: 400px" [cta]="cta"></cdx-cta>`,
	}));
