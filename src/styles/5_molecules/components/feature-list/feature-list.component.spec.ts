import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureListComponent } from './feature-list.component';
import { FeatureListItem, FeatureListItemComponent } from '../feature-list-item/feature-list-item.component';

describe('FeatureListComponent', () => {
	let component: FeatureListComponent;
	let fixture: ComponentFixture<FeatureListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeatureListComponent, FeatureListItemComponent],
			providers: [FeatureListItem],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeatureListComponent);
		component = fixture.componentInstance;
		component.items = [];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
