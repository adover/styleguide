import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconComponent } from '@woolworthsnz/styleguide';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaginationComponent, SvgIconComponent],
			imports: [BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when rotation and ellipses are true', () => {
		component.pageSize = 10;
		component.collectionSize = 100;
		component.currentPage = 5;
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('when rotation is false and ellipses is true', () => {
		component.pageSize = 10;
		component.collectionSize = 100;
		component.currentPage = 5;
		component.rotate = false;
		component.ellipses = true;
		expect(fixture).toMatchSnapshot();
	});

	it('when rotation and ellipses are false', () => {
		component.pageSize = 10;
		component.collectionSize = 100;
		component.currentPage = 5;
		component.rotate = false;
		component.ellipses = false;
		expect(fixture).toMatchSnapshot();
	});

	it('when rotation true and ellipses is false', () => {
		component.pageSize = 10;
		component.collectionSize = 100;
		component.currentPage = 5;
		component.rotate = true;
		component.ellipses = false;
		expect(fixture).toMatchSnapshot();
	});

	it('when rotation true and ellipses is false', () => {
		component.pageSize = 10;
		component.collectionSize = 100;
		component.currentPage = 5;
		component.rotate = true;
		component.ellipses = false;
		expect(fixture).toMatchSnapshot();
	});

	it('when click on next it should select next page', () => {
		jest.spyOn(component.pageChange, 'emit');
		jest.spyOn(component, 'selectPage');
		component.currentPage = 1;
		component.collectionSize = 100;
		component.pageSize = 10;
		component.pageCount = 10;
		fixture.debugElement.query(By.css('li.next a')).nativeElement.click();
		fixture.detectChanges();
		expect(component.selectPage).toHaveBeenCalledWith(2);
		expect(component.pageChange.emit).toHaveBeenCalledWith(2);
	});

	it('when click on prev it should select previous page', () => {
		jest.spyOn(component, 'selectPage');
		jest.spyOn(component.pageChange, 'emit');
		component.currentPage = 2;
		component.collectionSize = 100;
		component.pageSize = 10;
		component.pageCount = 10;
		fixture.debugElement.query(By.css('li.prev a')).nativeElement.click();
		fixture.detectChanges();
		expect(component.selectPage).toHaveBeenCalledWith(1);
		expect(component.pageChange.emit).toHaveBeenCalledWith(1);
	});

	it('when click on prev and cuurent page is 1 shouldnt do anything', () => {
		component.updatePages = jest.fn();
		component.currentPage = 1;
		fixture.detectChanges();
		fixture.debugElement.query(By.css('li.prev a')).nativeElement.click();
		expect(component.updatePages).not.toHaveBeenCalled();
	});

	it('when click on next and cuurent page is last page shouldnt do anything', () => {
		component.updatePages = jest.fn();
		component.pageCount = 10;
		component.currentPage = 10;

		fixture.detectChanges();
		fixture.debugElement.query(By.css('li.next a')).nativeElement.click();
		expect(component.updatePages).not.toHaveBeenCalled();
	});
});
