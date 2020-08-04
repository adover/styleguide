import { Component, Input, OnInit } from '@angular/core';
import { openClose } from '../../../animations';
import { BreakPointService, Device } from '../../../services/break-point.service';

@Component({
	selector: 'cdx-search-filters',
	template: `
		<h3 class="heading--4" [class.open]="isOpen" (click)="toggleFilters()">
			{{ title }}
		</h3>
		<div [@openClose]="isOpen" class="filtersContent">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./search-filters.component.scss'],
	animations: [...openClose],
})
export class SearchFiltersComponent implements OnInit {
	@Input() isOpen = true;
	@Input() title = 'Categories';

	constructor(public breakPointService: BreakPointService) {}

	ngOnInit(): void {
		this.breakPointService.device$.subscribe((device) => {
			this.isOpen = device !== Device.MOBILE;
		});
	}

	toggleFilters = () => {
		this.isOpen = !this.isOpen;
	};
}
