import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SvgIconComponent } from '@woolworthsnz/styleguide';
import { MockComponent } from 'ng-mocks';
import { HistoryService } from '../../../services/history.service';
import { CardComponent } from '../card/card.component';
import { SlottedModalComponent } from './slotted-modal.component';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
	template: `
		<cdx-slotted-modal>
			<div modal-content><p>Some content</p></div>
			<span modal-footer-primary>Footer</span>
			<h1 modal-header>Header</h1>
		</cdx-slotted-modal>
	`,
})
class SlottedModalContentComponent {
	constructor() {}
}

describe('SlottedModalComponent', () => {
	let component: SlottedModalComponent;
	let fixture: ComponentFixture<SlottedModalComponent>;
	let componentWithContent: SlottedModalContentComponent;
	let fixtureWithContent: ComponentFixture<SlottedModalContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, A11yModule],
			declarations: [
				SlottedModalComponent,
				CardComponent,
				MockComponent(SvgIconComponent),
				SlottedModalContentComponent,
			],
			providers: [HistoryService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SlottedModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		fixtureWithContent = TestBed.createComponent(SlottedModalContentComponent);
		componentWithContent = fixtureWithContent.componentInstance;
		fixtureWithContent.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should put content in slots', () => {
		expect(fixtureWithContent).toMatchSnapshot();
	});
});
