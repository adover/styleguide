import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

describe('TabComponent', () => {
	let component: TabComponent;
	let fixture: ComponentFixture<TabComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TabComponent],
			imports: [RouterTestingModule],
			providers: [TabsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
