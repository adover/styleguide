import { storiesOf } from '@storybook/angular';
import { OptionListComponent } from './option-list.component';
import { OptionListItemComponent } from '../option-list-item/option-list-item.component';

storiesOf('Atoms|Option List', module).add('With Events', () => {
	const listItems = [
		{ id: 1, surname: 'Trump' },
		{ id: 2, surname: 'Jong-un' },
		{ id: 3, surname: 'Jinping' },
		{ id: 4, surname: 'Putin' },
		{ id: 5, surname: 'Modi' },
	];

	return {
		moduleMetadata: {
			declarations: [OptionListComponent, OptionListItemComponent],
		},
		template: `<cdx-option-list [listItems]="listItems"></cdx-option-list>`,
		props: {
			listItems,
		},
	};
});
