import { PortalModule } from '@angular/cdk/portal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormModule } from '@woolworthsnz/form';
import { GridComponent, ProductImageComponent, ShopperNotesComponent, StampComponent } from '@woolworthsnz/product';
import { mockWeightedProduct } from 'libs/product/src/lib/components/stamp/mockProduct';
import { CarouselComponent } from './carousel.component';
import { WINDOW_PROVIDERS } from '../../../services';
import { StyleguideModule } from '../../../styleguide.module';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'cmp',
	template: `
		<cdx-carousel>
			<product-grid cdxCarousel [products]="products"></product-grid>
		</cdx-carousel>
	`,
})
class MockComponent {
	products = [mockWeightedProduct];
}

describe('CarouselComponent', () => {
	let component: CarouselComponent;
	let fixture: ComponentFixture<MockComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MockComponent, GridComponent, StampComponent, ShopperNotesComponent, ProductImageComponent],
			imports: [
				PortalModule,
				StyleguideModule,
				FormModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				RouterTestingModule,
				HttpClientTestingModule,
			],
			providers: [WINDOW_PROVIDERS],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MockComponent);
		component = fixture.debugElement.children[0].componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		spyOn(component, 'getComputedItemWidth').and.returnValue(10);

		expect(component).toBeTruthy();
	});

	describe('Getters', () => {
		beforeEach(() => {
			component.state$.next(<any>{
				currentPage: 1,
				itemWidth: 10,
				itemCount: 10,
				containerWidth: 100,
			});

			fixture.detectChanges();

			spyOn(component, 'getComputedItemWidth').and.returnValue(10);
		});

		it('isOnFirstPage', () => {
			expect(component.isOnFirstPage).toBe(true);

			component.setState({
				currentPage: 3,
			});

			fixture.detectChanges();

			expect(component.isOnFirstPage).toBe(false);
		});

		it('isOnLastPage', () => {
			const spy = spyOn(component, 'getPageCount');

			spy.and.returnValue(new Array(1));

			expect(component.isOnLastPage).toBe(true);

			spy.and.returnValue(new Array(99));

			fixture.detectChanges();

			component.setState({
				itemCount: 200,
			});

			expect(component.isOnLastPage).toBe(false);
		});
	});

	describe('getPageCount', () => {
		it('returns the correct page count', () => {
			component.setState({
				itemCount: 13,
				itemWidth: 240,
				containerWidth: 1100,
			});

			expect(component.getPageCount().length).toBe(4);

			component.setState({
				itemCount: 11,
				itemWidth: 240,
				containerWidth: 1100,
			});

			expect(component.getPageCount().length).toBe(3);
		});
	});

	describe('initCarousel', () => {
		beforeEach(() => {
			spyOn(component, 'getComputedItemWidth').and.returnValue(1000);
			spyOn(component, 'setState').and.callFake(() => {});
			spyOn(component['cdr'], 'markForCheck').and.callFake(() => {});
		});

		it('triggers change detection', fakeAsync(() => {
			component.initCarousel();
			tick();

			expect(component['cdr'].markForCheck).toHaveBeenCalled();
		}));

		it('gets called on resize', () => {
			spyOn(component, 'initCarousel').and.callFake(() => {});

			fixture.detectChanges();

			window.dispatchEvent(new Event('resize'));

			fixture.detectChanges();

			expect(component.initCarousel).toHaveBeenCalled();
		});

		it('sets state', () => {
			component.initCarousel();

			component.container = {
				nativeElement: {
					offsetWidth: 100,
				},
			};

			expect(component.setState).toHaveBeenCalledWith({
				itemCount: 1,
				itemWidth: 1000,
				containerWidth: 0,
			});
		});

		it('gets called initially', () => {
			spyOn(component, 'initCarousel');

			component.ngAfterViewInit();

			expect(component.initCarousel).toHaveBeenCalled();
		});

		it('gets the width of the child item', () => {
			component.initCarousel();

			expect(component.getComputedItemWidth).toHaveBeenCalled();
		});
	});

	describe('getTranslateAmount', () => {
		it('passes the correct translate amount', () => {
			const itemsPerPageSpy = spyOn(component, 'getItemsPerPage');

			itemsPerPageSpy.and.returnValue(5);

			const setMock = (itemCount, itemWidth, itemsPerPage) => {
				component.setState({
					itemCount,
					itemWidth,
				});

				itemsPerPageSpy.and.returnValue(itemsPerPage);

				fixture.detectChanges();
			};

			setMock(10, 100, 5);

			expect(component.getTranslateAmount(1)).toBe(0);

			setMock(10, 100, 5);

			expect(component.getTranslateAmount(2)).toBe(500);

			setMock(12, 100, 5);

			expect(component.getTranslateAmount(3)).toBe(700);

			setMock(13, 100, 3);

			expect(component.getTranslateAmount(5)).toBe(1000);
		});
	});

	describe('next', () => {
		it('', () => {});
	});

	describe('prev', () => {
		it('', () => {});
	});

	describe('pagination', () => {
		it('', () => {});
	});
});
