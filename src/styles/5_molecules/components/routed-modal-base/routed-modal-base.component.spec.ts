import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutedModalBaseComponent } from './routed-modal-base.component';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HistoryService } from '@woolworthsnz/styleguide';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ template: `` })
class RoutedModalBaseImplComponent extends RoutedModalBaseComponent {
	constructor(protected router: Router, protected historyService: HistoryService) {
		super(router, historyService);
	}
}

describe('RoutedModalBaseComponent', () => {
	let component: RoutedModalBaseComponent;
	let fixture: ComponentFixture<RoutedModalBaseComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [NoopAnimationsModule, RouterTestingModule],
			declarations: [RoutedModalBaseComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RoutedModalBaseImplComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
