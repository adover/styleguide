import { Component, Input, HostBinding } from '@angular/core';
import { Route } from '@angular/router';

/**
 * @description
 * @export
 */
@Component({
	selector: 'cdx-nav',
	template: `
		<ng-container *ngIf="routes">
			<ul>
				<ng-container *ngFor="let route of routes">
					<li *ngIf="route.path">
						<a
							[routerLink]="[route.path]"
							[routerLinkActiveOptions]="{ exact: true }"
							routerLinkActive="link--active"
							>{{ route.data?.title }}</a
						>
					</li>
				</ng-container>
			</ul>
		</ng-container>
	`,
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
	@HostBinding('attr.role') role = 'navigation';

	@Input() routes: Route[];
}
