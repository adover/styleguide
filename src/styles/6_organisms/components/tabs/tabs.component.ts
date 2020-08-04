import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabComponent } from './tab.component';
import { kebabCase } from '../../../helpers';
import {
	Component,
	Input,
	ChangeDetectionStrategy,
	ViewChild,
	ElementRef,
	EventEmitter,
	Output,
	ContentChild,
	TemplateRef,
	AfterViewInit,
} from '@angular/core';

/**
 * @description TabList component
 * @example
    <cdx-tabs>
      <cdx-tab heading="Sign in">
        Tab 1
      </cdx-tab>
      <cdx-tab heading="Register">
        Tab 2
      </cdx-tab>
    </cdx-tabs>
 * @export
 */
@Component({
	selector: 'cdx-tabs',
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'cdxTabs',
	template: `
		<ul class="tabs-header" role="tablist">
			<li
				class="tabs-headerItem"
				[class.tabs-headerItem--active]="tab.active"
				role="presentation"
				*ngFor="let tab of tabs"
			>
				<ng-container *ngIf="tab.href; then link; else button"> </ng-container>

				<ng-template #link>
					<a
						id="{{ getSlugFromHeading(tab.heading) }}"
						role="tab"
						[routerLink]="tab.href"
						(click)="selectTab(tab)"
						[attr.aria-controls]="getSlugFromHeading(tab.heading)"
						[attr.aria-selected]="tab.active"
					>
						{{ tab.heading }}
					</a>
				</ng-template>
				<ng-template #button>
					<button
						id="{{ getSlugFromHeading(tab.heading) }}"
						role="tab"
						(click)="selectTab(tab)"
						[attr.aria-controls]="getSlugFromHeading(tab.heading)"
						[attr.aria-selected]="tab.active"
					>
						{{ tab.heading }}
					</button>
				</ng-template>
			</li>
		</ul>
		<div class="tabs-body">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterViewInit {
	@Input() routed: boolean;
	@Input() startIndex = 0;
	@Output() tabSelect: EventEmitter<any> = new EventEmitter();

	currentTab: TabComponent;
	slug: string;
	tabsSubscription: Subscription;
	tabs: TabComponent[] = [];

	constructor(private router: Router) {
		//TODO selectTab functionality should be in one place, at present tab registers itself and marked as select.
		// this.router.events.subscribe(event => {
		//   if(event instanceof NavigationEnd) {
		//     const tab = this.tabs.filter(tab => {
		//       return event.url.indexOf(`${tab.href}?nextUI=true`) > -1
		//     })[0];
		//     tab && this.selectTab(tab);
		//   }
		// });
	}

	ngAfterViewInit(): void {
		this.emitTabChange(this.currentTab);
	}

	getSlugFromHeading = (tabHeading: string) => `${kebabCase(tabHeading)}-tab`;

	// If we're using a routed component we will need
	// to listen for the selection event
	emitTabChange(tab: TabComponent) {
		if (tab && tab.active) {
			this.tabSelect.emit(tab.href);
		}
	}

	registerTab(tab: TabComponent) {
		tab.active = this.routed ? this.router.url.indexOf(tab.href) > -1 : this.tabs.length === 0;

		if (tab.active) this.currentTab = tab;

		this.tabs.push(tab);
	}

	selectTab(tab: TabComponent) {
		this.tabs.forEach((t) => {
			t.active = false;
		});

		tab.active = true;

		this.currentTab = tab;

		this.emitTabChange(tab);
	}
}
