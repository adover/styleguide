import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';
import { SvgDefinitionsComponent, SvgIconComponent } from '@woolworthsnz/styleguide';

storiesOf('Molecules| Breadcrumb', module).add('default', () => ({
	moduleMetadata: {
		declarations: [SvgDefinitionsComponent, SvgIconComponent, BreadcrumbComponent],
		imports: [RouterTestingModule],
	},
	template: `
    <cdx-svg-definitions></cdx-svg-definitions>
    <cdx-breadcrumb></cdx-breadcrumb>
  `,
}));
