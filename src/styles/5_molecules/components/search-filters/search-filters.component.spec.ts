import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFiltersComponent } from './search-filters.component';
import { ApiService, APP_SETTINGS_PROVIDER, AppSettingsService, BreakPointService } from '../../../services';
import { StyleGuideConfig } from '../../../styleguide.config';
@Component({
	template: `
		<cdx-search-filters [isOpen]="isOpen">
			<div *ngFor="let item of filterItems">{{ item }}</div>
		</cdx-search-filters>
	`,
})
class HostComponent {
	filterItems = ['Bakery (2)', 'Seafood (92)', 'Baby Care(10)', 'Baking & Cooking (103)', 'Drinks- Hot & Cold(29)'];
	isOpen = true;
}

describe('Search Filters Component', () => {
	let hostComponent: HostComponent;
	let hostFixture: ComponentFixture<HostComponent>;
	let component: SearchFiltersComponent;
	let fixture: ComponentFixture<SearchFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SearchFiltersComponent, HostComponent],
			providers: [
				APP_SETTINGS_PROVIDER,
				{
					provide: AppSettingsService,
					useValue: {
						getEndpoint: () => '/api',
						getTransition: () => '',
						getBreakpoints: () => ({
							mobile: '',
							desktop: '',
							tablet: '',
						}),
					},
				},
				ApiService,
				BreakPointService,
				{
					provide: StyleGuideConfig,
					useValue: {
						breakpoints: {
							mobile: '640px',
							tablet: '970px',
							desktop: '1200px',
						},
					},
				},
			],
			imports: [BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		hostFixture = TestBed.createComponent(HostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();

		fixture = TestBed.createComponent(SearchFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(hostComponent).toBeTruthy();
	});

	it('render filters as open', () => {
		expect(hostFixture).toMatchSnapshot();
	});

	it('render filters as closed', () => {
		hostComponent.isOpen = false;
		hostFixture.detectChanges();
		expect(hostFixture).toMatchSnapshot();
	});

	it('toggleFilters shoudl toggle the open state', () => {
		component.toggleFilters();
		expect(component.isOpen).toBeTruthy();
	});

	it('clicking on heading should toggle the open state', () => {
		component.toggleFilters = jest.fn();
		fixture.detectChanges();
		fixture.debugElement.query(By.css('h3')).nativeElement.click();
		expect(component.toggleFilters).toHaveBeenCalled();
	});
});
