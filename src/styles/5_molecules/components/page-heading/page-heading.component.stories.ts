import { storiesOf } from '@storybook/angular';
import { PageHeadingComponent } from './page-heading.component';

storiesOf('Molecules| Page heading', module).add('default', () => {
	return {
		moduleMetadata: {
			declarations: [PageHeadingComponent],
		},
		template: `
        <cdx-page-heading>
          <div title> Example page head</div>
        </cdx-page-heading>`,
	};
});
