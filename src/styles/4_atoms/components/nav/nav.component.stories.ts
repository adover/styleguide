import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storiesOf } from '@storybook/angular';
import { NavComponent } from './nav.component';

storiesOf('Atoms|Navigation', module).add('Main Nav', () => {
	const routes = [
		{
			path: 'iframe.html',
			redirectTo: '/foo',
			data: {
				title: 'iFrame',
			},
		},
		{
			path: 'foo',
			redirectTo: '/foo',
			data: {
				title: 'HOME',
			},
		},
		{
			path: 'foo',
			redirectTo: '/foo',
			data: {
				title: 'BROWSE',
			},
		},
		{
			path: 'foo',
			redirectTo: '/foo',
			data: {
				title: 'SPECIALS',
			},
		},
		{
			path: 'foo',
			redirectTo: '/foo',
			data: {
				title: 'RECIPES',
			},
		},
	];
	return {
		moduleMetadata: {
			declarations: [NavComponent],
			imports: [RouterModule.forRoot(routes)],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
		},
		template: `<cdx-nav [routes]="routes"></cdx-nav>`,
		props: {
			routes,
		},
	};
});
