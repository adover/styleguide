import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModal } from './base-modal';
import { Component } from '@angular/core';
import { ModalOverlayService } from '@woolworthsnz/styleguide';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ template: `` })
class BaseModalImplComponent extends BaseModal {
	constructor(public modalOverlayService: ModalOverlayService) {
		super(modalOverlayService);
	}
}

describe('BaseModal', () => {
	let component: BaseModal;
	let fixture: ComponentFixture<BaseModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule, PortalModule, RouterTestingModule],
			declarations: [BaseModalImplComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BaseModalImplComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
