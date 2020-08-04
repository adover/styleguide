import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SanitizeHtmlPipe, SlidePanelComponent, StyleguideModule } from '@woolworthsnz/styleguide';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

describe('AccordionComponent', () => {
	let component: AccordionComponent;
	let fixture: ComponentFixture<AccordionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccordionComponent, AccordionItemComponent, SlidePanelComponent, SanitizeHtmlPipe],
			imports: [BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccordionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
