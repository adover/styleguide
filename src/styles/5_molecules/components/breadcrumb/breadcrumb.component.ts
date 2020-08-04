import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'cdx-breadcrumb',
	template: `
		<ul *ngIf="items.length">
			<li>
				<a routerLink="/" class="_noajax" aria-label="Home">
					<cdx-svg-icon name="home" size="small" fill="dark"></cdx-svg-icon>
				</a>
				<cdx-svg-icon name="chevron-right" fill="dark" size="extra-small"></cdx-svg-icon>
			</li>
			<li *ngFor="let item of items; let last = last">
				<ng-container *ngIf="item.routeUrl">
					<a [routerLink]="item.routeUrl" [queryParams]="item.queryParams">{{ item.text | titlecase }}</a>
				</ng-container>
				<ng-container *ngIf="!item.routeUrl">
					<span>{{ item.text | titlecase }}</span>
				</ng-container>
				<div class="separator"></div>
				<cdx-svg-icon name="chevron-right" fill="dark" size="extra-small" *ngIf="!last"></cdx-svg-icon>
			</li>
		</ul>
	`,
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
	@Input() items: any[] = [];

	constructor(private router: Router) {}

	ngOnInit(): void {}

	navigate = (link: string) => {
		this.router.navigateByUrl(link);
	};
}
