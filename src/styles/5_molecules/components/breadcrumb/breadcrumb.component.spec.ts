import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SvgIconComponent } from '@woolworthsnz/styleguide';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
	let component: BreadcrumbComponent;
	let fixture: ComponentFixture<BreadcrumbComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BreadcrumbComponent, SvgIconComponent],
			imports: [RouterTestingModule, BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BreadcrumbComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match snapshot', () => {
		component.items = [
			{ text: 'Groceries', routeUrl: '/', queryParams: {} },
			{
				text: 'Foo',
				routeUrl: 'shop/browse/foo',
				queryParams: {
					search: 'milk',
					page: 1,
					size: 24,
					sort: undefined,
					dasFilter: 'foo;1;Foo;false',
					filters: null,
				},
			},
			{
				text: 'Bar',
				routeUrl: 'shop/browse/foo/bar',
				queryParams: {
					search: 'milk',
					page: 1,
					size: 24,
					sort: undefined,
					dasFilter: 'bar;1;Bar;false',
					filters: null,
				},
			},
			{
				text: 'Baz',
				routeUrl: 'shop/browse/foo/bar/baz',
				queryParams: {
					search: 'milk',
					page: 1,
					size: 24,
					sort: undefined,
					dasFilter: 'baz;1;Baz;false',
					filters: null,
				},
			},
		];
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should match snapshot with item not having route url', () => {
		component.items = [
			{ text: 'Groceries', routeUrl: '/', queryParams: {} },
			{
				text: 'Foo',
				routeUrl: 'shop/browse/foo',
				queryParams: {
					search: 'milk',
					page: 1,
					size: 24,
					sort: undefined,
					dasFilter: 'foo;1;Foo;false',
					filters: null,
				},
			},
			{
				text: 'Bar',
				routeUrl: 'shop/browse/foo/bar',
				queryParams: {
					search: 'milk',
					page: 1,
					size: 24,
					sort: undefined,
					dasFilter: 'bar;1;Bar;false',
					filters: null,
				},
			},
			{
				text: 'Baz',
				routeUrl: '',
				queryParams: {},
			},
		];
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
});
