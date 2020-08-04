import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PersuasionBarComponent } from './persuasion-bar.component';
import { PersuasionBarMockData } from './persuasion-bar.mock';

describe('PersuasionBarComponent', () => {
	let component: PersuasionBarComponent;
	let fixture: ComponentFixture<PersuasionBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PersuasionBarComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PersuasionBarComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('does not show an image if the imageurl is not in the item object', () => {
		component.items = [{ ...PersuasionBarMockData[0], icon: null }];
		fixture.detectChanges();

		const anchor = document.querySelector('a');
		expect(anchor.querySelector('img')).toBeNull();
	});

	it('correctly sets the data items attribute', () => {
		component.items = PersuasionBarMockData;
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css('div')).attributes['data-items']).toEqual('3');
	});
});
