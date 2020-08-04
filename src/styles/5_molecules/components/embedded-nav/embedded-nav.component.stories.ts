import { RouterTestingModule } from '@angular/router/testing';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';
import { AppSettingsService } from '../../../services';
import { EmbeddedNavComponent } from './embedded-nav.component';

storiesOf('Molecules|Embedded Nav', module)
	.addDecorator(withKnobs)
	.addDecorator(withA11y)
	.add('shorter than the wrapping element (stretches to fit)', () => {
		return {
			moduleMetadata: {
				declarations: [EmbeddedNavComponent],
				imports: [RouterTestingModule],
				providers: [
					{
						provide: AppSettingsService,
						useValue: {
							state$: new BehaviorSubject({
								navs: {
									embedded: [
										{
											url: '',
											text: 'Item 1',
										},
										{
											url: 'two',
											text: 'Item 2',
										},
										{
											url: 'three',
											text: 'Item 3',
										},
									],
								},
							}),
							getSetting: () => true,
						},
					},
				],
			},
			template: `
			  <style>
						.wrap {
							margin-top: 30px;
						}
				</style>
        <div class="wrap">
          <nav embeddedNav></nav>
        </div>`,
			props: {},
		};
	})
	.add('longer than the wrapping element (scrolls)', () => {
		return {
			moduleMetadata: {
				declarations: [EmbeddedNavComponent],
				imports: [RouterTestingModule],
				providers: [
					{
						provide: AppSettingsService,
						useValue: {
							state$: new BehaviorSubject({
								navs: {
									embedded: [
										{
											url: '',
											text: 'A very very long Item 1',
										},
										{
											url: 'two',
											text: 'A very very long Item 2',
										},
										{
											url: 'three',
											text: 'A very very long Item 3',
										},
										{
											url: 'four',
											text: 'A very very long Item 4',
										},
										{
											url: 'five',
											text: 'A very very long Item 5',
										},
										{
											url: 'six',
											text: 'A very very long Item 6',
										},
										{
											url: 'seven',
											text: 'A very very long Item 7',
										},
										{
											url: 'eight',
											text: 'A very very long Item 8',
										},
										{
											url: 'nine',
											text: 'A very very long Item 9',
										},
									],
								},
							}),
							getSetting: () => true,
						},
					},
				],
			},
			template: `
			  <style>
						.wrap {
							margin-top: 30px;
						}
				</style>
        <div class="wrap">
          <nav embeddedNav></nav>
        </div>`,
			props: {},
		};
	});
