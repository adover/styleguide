import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidePanelComponent } from './slide-panel.component';

describe('SlidePanelComponent', () => {
	let component: SlidePanelComponent;
	let fixture: ComponentFixture<SlidePanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SlidePanelComponent],
			imports: [BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SlidePanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
