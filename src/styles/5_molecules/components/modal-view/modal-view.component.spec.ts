import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalViewComponent } from './modal-view.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalViewComponent', () => {
	let component: ModalViewComponent;
	let fixture: ComponentFixture<ModalViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule, PortalModule, RouterTestingModule, NoopAnimationsModule],
			declarations: [ModalViewComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should match basic snapshot', () => {
		expect(fixture).toMatchSnapshot();
	});
});
