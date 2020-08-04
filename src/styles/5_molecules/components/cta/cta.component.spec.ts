import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaComponent } from './cta.component';
import { StyleguideModule } from '../../../styleguide.module';

describe('CtaComponent', () => {
	let component: CtaComponent;
	let fixture: ComponentFixture<CtaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [StyleguideModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CtaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
