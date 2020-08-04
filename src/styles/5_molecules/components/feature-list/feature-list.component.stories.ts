import { storiesOf } from '@storybook/angular';
import { FeatureListComponent } from './feature-list.component';
import { FeatureListItemComponent } from '../feature-list-item/feature-list-item.component';

storiesOf('Molecules| Feature List', module).add('Feature List', () => {
	const items = [
		{
			imagePosition: 'above',
			text: 'Feature1',
			icon:
				'M2.31 9.31a1.06 1.06 0 0 1 1.49 0l8.2 8.16 8.2-8.16a1.06 1.06 0 0 1 1.49 0 1 1 0 0 1 0 1.48l-9 8.9a1 1 0 0 1-1.48 0l-8.95-8.9a1 1 0 0 1-.26-.74 1 1 0 0 1 .31-.74z',
		},
		{
			text: 'Feature2',
		},
		{
			imagePosition: 'above',
			text: 'Feature3',
			icon:
				'M2.31 9.31a1.06 1.06 0 0 1 1.49 0l8.2 8.16 8.2-8.16a1.06 1.06 0 0 1 1.49 0 1 1 0 0 1 0 1.48l-9 8.9a1 1 0 0 1-1.48 0l-8.95-8.9a1 1 0 0 1-.26-.74 1 1 0 0 1 .31-.74z',
		},
	];
	return {
		moduleMetadata: {
			declarations: [FeatureListComponent, FeatureListItemComponent],
		},
		template: `
        <cdx-feature-list [items]="items" >
        </cdx-feature-list>`,
		props: {
			items,
		},
	};
});
