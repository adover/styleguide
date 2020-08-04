import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GENERIC_MODAL_DATA, GenericModalComponent } from './generic-modal.component';
import { StyleguideModule } from '../../../styleguide.module';

describe('GenericModalComponent', () => {
	let component: GenericModalComponent;
	let fixture: ComponentFixture<GenericModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [BrowserAnimationsModule, StyleguideModule, RouterTestingModule],
			providers: [
				{
					provide: GENERIC_MODAL_DATA,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GenericModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('calls a method that gets passed via injection token as well as calling an event emitter', () => {
		component.modalData = {
			ctaAction: jest.fn(),
		};

		spyOn(component.modalCTAEmitter, 'emit');

		component.ctaEmit();

		fixture.detectChanges();

		expect(component.modalData.ctaAction).toHaveBeenCalled();
		expect(component.modalCTAEmitter.emit).toHaveBeenCalled();
	});
});
