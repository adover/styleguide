import 'intersection-observer';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DynamicContentModule } from '@woolworthsnz/dynamic-content';
import { AppSettingsService, StyleguideModule } from '@woolworthsnz/styleguide';
import { EmbeddedNavComponent } from './embedded-nav.component';

describe('EmbeddedNavComponent', () => {
	let component: EmbeddedNavComponent;
	let fixture: ComponentFixture<EmbeddedNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbeddedNavComponent],
			providers: [
				{
					provide: AppSettingsService,
					useValue: {
						getSetting: () => true,
						state$: new BehaviorSubject({
							navs: {
								embedded: [
									{
										url: '/',
										text: 'Home',
										exact: true,
									},
									{
										url: '/shop/browse',
										text: 'Browse',
									},
									{
										url: '/shop/specials',
										text: 'Specials',
									},
									{
										url: '/shop/favourites',
										text: 'My Favourites',
									},
								],
							},
						}),
					},
				},
			],
			imports: [
				StyleguideModule,
				RouterTestingModule,
				BrowserAnimationsModule,
				DynamicContentModule,
				HttpClientTestingModule,
				PortalModule,
			],
		});
	}));

	it('should create', () => {
		fixture = TestBed.createComponent(EmbeddedNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		expect(component._navItems.length).toEqual(4);
	});

	it('should remove specials if specials are disabled', () => {
		TestBed.overrideProvider(AppSettingsService, {
			useValue: {
				getSetting: () => false,
				state$: new BehaviorSubject({
					navs: {
						embedded: [
							{
								url: '/',
								text: 'Home',
								exact: true,
							},
							{
								url: '/shop/browse',
								text: 'Browse',
							},
							{
								url: '/shop/specials',
								text: 'Specials',
							},
							{
								url: '/shop/favourites',
								text: 'My Favourites',
							},
						],
					},
				}),
			},
		});
		fixture = TestBed.createComponent(EmbeddedNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		expect(component._navItems.length).toEqual(3);
	});
});
