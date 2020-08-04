import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { AlertType } from '../../../ui-models';

@Component({
	selector: `cdx-host`,
	template: `
		<cdx-alert [candismiss]="candismiss" [type]="alertType" [title]="content" [description]="description"></cdx-alert>
	`,
})
class DummyComponent {
	candismiss: boolean;
	alertType: AlertType;
	content: string;
	description: string | string[];
}

describe('AlertComponent', () => {
	let dummyComponent: DummyComponent;
	let fixture: ComponentFixture<DummyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [],
			declarations: [AlertComponent, DummyComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DummyComponent);
		dummyComponent = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(dummyComponent).toBeTruthy();
	});

	it('sets the correct dataType based on the alertType input', () => {
		dummyComponent.alertType = AlertType.info;

		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('displays a fallback message if ng content is empty', () => {
		expect(fixture.debugElement.query(By.css('#alertLabel')).nativeElement.textContent.trim()).toBe(
			'Sorry an error has occurred. If you continue to receive these errors please contact our Customer Service Team on 0800 40 40 40'
		);
	});

	xit('Calls closeAlert when the close button is clicked on', () => {
		// TODO: Method not implemented yet
	});

	it('Updates the host class if it can be closed', () => {
		dummyComponent.candismiss = true;

		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('Has a role of alertdialog if it can dismiss', () => {
		dummyComponent.candismiss = true;

		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css('.alert')).nativeElement.getAttribute('role')).toBe('alertdialog');
	});

	it('Has a role of alert if it cannot dismiss', () => {
		dummyComponent.candismiss = false;

		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css('.alert')).nativeElement.getAttribute('role')).toBe('alert');
	});
});
