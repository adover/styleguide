import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconComponent } from './svg-icon.component';

describe('SvgIconComponent', () => {
	let component: SvgIconComponent;
	let fixture: ComponentFixture<SvgIconComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SvgIconComponent],
			imports: [BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SvgIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
