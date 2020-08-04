import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotlightComponent } from './spotlight.component';
import { CardComponent } from '../../../5_molecules/components';

describe('SpotlightComponent', () => {
	let component: SpotlightComponent;
	let fixture: ComponentFixture<SpotlightComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SpotlightComponent, CardComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SpotlightComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
