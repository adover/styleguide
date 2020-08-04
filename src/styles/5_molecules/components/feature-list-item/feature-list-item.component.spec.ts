import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureListItemComponent, FeatureListItem } from './feature-list-item.component';

describe('FeatureListItemComponent', () => {
	let component: FeatureListItemComponent;
	let fixture: ComponentFixture<FeatureListItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeatureListItemComponent],
			providers: [FeatureListItem],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeatureListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
