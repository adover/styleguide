import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuccessIconComponent } from './success-icon.component';

describe('SuccessIconComponent', () => {
	let component: SuccessIconComponent;
	let fixture: ComponentFixture<SuccessIconComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SuccessIconComponent],
			imports: [BrowserAnimationsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuccessIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
