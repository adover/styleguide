import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { CardComponent } from './card.component';

storiesOf('Molecules|Card', module)
	.addDecorator(withKnobs)
	.add('With text', () => {
		const url = text('url', '#someurl');
		const title = text('title', 'Abes Bagels Gluten Free 270g 3pk');
		const content = text('text', 'Lorem Ipsum Dollar  ');

		return {
			moduleMetadata: {
				declarations: [CardComponent],
			},
			template: `
        <cdx-card [url]="url" [text]="content" [title]="title">
          I am a card
        </cdx-card>`,
			props: {
				url,
				title,
				content,
			},
		};
	})
	.add('Without text', () => {
		const url = text('url', '#someurl');
		const title = text('title', 'Abes Bagels Gluten Free 270g 3pk');

		return {
			moduleMetadata: {
				declarations: [CardComponent],
			},
			template: `
        <cdx-card [url]="url"  [title]="title">
          <img src="https://shop.countdown.co.nz/Content/ProductImages/zoom/9421001850783.jpg/Abes-Bagels-Everything-Bagel-360g.jpg"  image />
        </cdx-card>`,
			props: {
				url,
				title,
			},
		};
	});
