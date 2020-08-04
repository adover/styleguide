import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteModalComponent } from './autocomplete-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CardComponent } from '../card/card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AutocompleteModalComponent', () => {
	let component: AutocompleteModalComponent;
	let fixture: ComponentFixture<AutocompleteModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule, PortalModule, RouterTestingModule],
			declarations: [AutocompleteModalComponent, CardComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AutocompleteModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
