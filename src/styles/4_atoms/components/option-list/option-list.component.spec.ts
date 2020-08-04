import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OptionListComponent } from './option-list.component';
import { OptionListItemComponent } from '../option-list-item/option-list-item.component';

describe('OptionListComponent', () => {
	let component: OptionListComponent;
	let fixture: ComponentFixture<OptionListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OptionListComponent, OptionListItemComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OptionListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('on click on option item it should call handler with option index', () => {
		component.listItems = [{ Text: 'foo', Id: 2 }];
		component.displayKey = 'Text';
		component.onClick = jest.fn();
		fixture.detectChanges();
		fixture.debugElement.query(By.css('li')).nativeElement.click();
		expect(component.onClick).toHaveBeenCalledWith(0);
	});

	it('on click on option item it should emit the option', () => {
		component.listItems = [{ Text: 'foo', Id: 2 }];
		component.displayKey = 'Text';
		jest.spyOn(component.optionSelect, 'emit');
		fixture.detectChanges();
		fixture.debugElement.query(By.css('li')).nativeElement.click();
		expect(component.optionSelect.emit).toHaveBeenCalledWith({
			Id: 2,
			Text: 'foo',
		});
	});
});
