import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { storiesOf } from '@storybook/angular';
import { SearchFiltersComponent } from './search-filters.component';
import { THEME_CONSTANTS } from '../../../1_settings/theme';
import { StyleGuideConfig } from '../../../styleguide.config';
import { APP_SETTINGS_PROVIDER, ApiService } from '../../../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

storiesOf('Molecules| SearchFilters', module).add('default', () => {
	const filterItems = [
		'Bakery (2)',
		'Seafood (92)',
		'Baby Care(10)',
		'Baking & Cooking (103)',
		'Drinks- Hot & Cold(29)',
	];
	return {
		moduleMetadata: {
			declarations: [SearchFiltersComponent],
			imports: [BrowserAnimationsModule, HttpClientTestingModule],
			providers: [
				APP_SETTINGS_PROVIDER,
				ApiService,
				{
					provide: StyleGuideConfig,
					useValue: {
						breakpoints: THEME_CONSTANTS.breakpoints,
					},
				},
			],
		},
		template: `
        <cdx-search-filters>
          <ul>
            <li
              *ngFor="let item of filterItems"
            >
              <button
              >
                {{ item | titlecase }} (2)
              </button>
            </li>
          </ul>
        </cdx-search-filters>
    `,
		props: {
			filterItems: filterItems,
		},
	};
});
