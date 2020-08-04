import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService, AppSettingsService, WINDOW_PROVIDERS } from '../../../services';
import { HistoryService } from '../../../services/history.service';
import { OliveRoundelComponent } from './olive-roundel.component';

describe('OliveRoundelComponent', () => {
	let component: OliveRoundelComponent;
	let fixture: ComponentFixture<OliveRoundelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [OliveRoundelComponent],
			providers: [
				WINDOW_PROVIDERS,
				ApiService,
				{
					provide: AppSettingsService,
					useValue: {
						getEndpoint: () => '/api',
						getBreakpoints: () => ({
							mobile: '',
							desktop: '',
							tablet: '',
						}),
					},
				},
				HistoryService,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OliveRoundelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
