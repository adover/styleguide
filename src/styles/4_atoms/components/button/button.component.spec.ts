import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonState } from '../../../ui-models';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessIconComponent } from '../success-icon/success-icon.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ButtonComponent, LoadingComponent, SuccessIconComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render with busy loader', () => {
		fixture.detectChanges();
		component.state = ButtonState.busy;
		expect(fixture).toMatchSnapshot();
	});

	it('should render without busy loader', () => {
		component.state = ButtonState.default;
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
	it('should render as disabled', () => {
		component.disabled = true;
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
	it('should render as active', () => {
		component.disabled = false;
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should render as primary', () => {
		component.fillStyle = 'primary';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
	it('should render as secondary', () => {
		component.fillStyle = 'secondary';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
	it('should render as outline', () => {
		component.fillStyle = 'outline';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});
	it('should render as flat', () => {
		component.fillStyle = 'flat';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should render as large', () => {
		component.size = 'large';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should render as default', () => {
		component.size = 'default';
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('should render full width', () => {
		component.fullWidth = true;
		fixture.detectChanges();
		expect(fixture).toMatchSnapshot();
	});

	it('set button complete state', fakeAsync(() => {
		component.setState = jest.fn();
		component.buttonState = ButtonState.busy;
		component.buttonState = ButtonState.completed;
		expect(component.setState).toHaveBeenCalledWith(ButtonState.busy);
		expect(component.setState).not.toHaveBeenCalledWith(ButtonState.completed);
		expect(component.setState).toBeCalledTimes(1);
		tick(1000);
		expect(component.setState).toHaveBeenCalledWith(ButtonState.completed);
	}));
});
