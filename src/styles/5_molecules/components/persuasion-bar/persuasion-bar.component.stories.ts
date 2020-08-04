import { storiesOf } from '@storybook/angular';
import { PersuasionBarComponent } from './persuasion-bar.component';

storiesOf('Molecules| Persuasion Bar', module).add('Persuasion Bar', () => {
	const items = [
		{
			url: '#url',
			text: 'Feature 1',
			icon:
				'M2.31 9.31a1.06 1.06 0 0 1 1.49 0l8.2 8.16 8.2-8.16a1.06 1.06 0 0 1 1.49 0 1 1 0 0 1 0 1.48l-9 8.9a1 1 0 0 1-1.48 0l-8.95-8.9a1 1 0 0 1-.26-.74 1 1 0 0 1 .31-.74z',
		},
		{
			url: '#url',
			text: 'Feature 2',
			icon:
				'M2.31 9.31a1.06 1.06 0 0 1 1.49 0l8.2 8.16 8.2-8.16a1.06 1.06 0 0 1 1.49 0 1 1 0 0 1 0 1.48l-9 8.9a1 1 0 0 1-1.48 0l-8.95-8.9a1 1 0 0 1-.26-.74 1 1 0 0 1 .31-.74z',
		},
		{
			url: '#url2',
			text: 'Feature 3',
			icon:
				'M2.31 9.31a1.06 1.06 0 0 1 1.49 0l8.2 8.16 8.2-8.16a1.06 1.06 0 0 1 1.49 0 1 1 0 0 1 0 1.48l-9 8.9a1 1 0 0 1-1.48 0l-8.95-8.9a1 1 0 0 1-.26-.74 1 1 0 0 1 .31-.74z',
		},
	];
	return {
		moduleMetadata: {
			declarations: [PersuasionBarComponent],
		},
		template: `
        <cdx-persuasion-bar [items]="items">
          Lorem Ipsum Dollar
        </cdx-persuasion-bar>`,
		props: {
			items,
		},
	};
});
