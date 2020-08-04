import { centered } from '@storybook/addon-centered/angular';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { StyleguideModule } from '../../../styleguide.module';

storiesOf('Molecules| Pagination', module)
	.addDecorator(withKnobs)
	.addDecorator(centered)
	.add('default', () => {
		const rotate = boolean('rotate', false);
		const ellipses = boolean('ellipses', true);
		const collectionSize = text('collectionSize', '100');
		const pagesToShow = text('maxSize', '3');
		const pageSize = text('pageSize', '10');
		return {
			moduleMetadata: {
				imports: [StyleguideModule],
			},
			template: `
        <cdx-pagination
          [currentPage]="1"
          [ellipses]="ellipses"
          [collectionSize]="collectionSize"
          [pageSize]="pageSize"
          [rotate]="rotate"
          [maxSize]="pagesToShow"
        >
        </cdx-pagination>
        <cdx-svg-definitions></cdx-svg-definitions>`,
			props: {
				ellipses,
				rotate,
				collectionSize,
				pagesToShow,
				pageSize,
			},
		};
	});
