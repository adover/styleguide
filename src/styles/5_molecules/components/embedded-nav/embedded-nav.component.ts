import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppSettings, AppSettingsService } from '../../../services';

export interface EmbeddedNavigationItem {
	url: string;
	text: string;
	exact?: boolean;
}

@UntilDestroy()
@Component({
	selector: 'cdx-embedded-nav, [embeddedNav]',
	templateUrl: './embedded-nav.component.html',
	styleUrls: ['./embedded-nav.component.scss'],
})
export class EmbeddedNavComponent implements OnInit {
	public _navItems: EmbeddedNavigationItem[];

	@Input() set stickyTarget(el: ElementRef) {
		if (el) {
			this.stickyHeaderObserver.observe(el.nativeElement);
		}
	}

	stickyHeaderObserver = new IntersectionObserver(
		([e]) => {
			e.target.toggleAttribute('data-stuckToTop', e.intersectionRatio < 1);
			this.hostElement?.nativeElement.toggleAttribute('flat', e.intersectionRatio < 1);
		},
		{
			threshold: [1],
		}
	);

	ngOnInit() {
		this.appSettingsService.state$
			.pipe(untilDestroyed(this))
			.subscribe((appSettings: AppSettings) => (this.navItems = appSettings.navs.embedded));
	}

	constructor(private appSettingsService: AppSettingsService, private hostElement: ElementRef) {}

	set navItems(val: EmbeddedNavigationItem[]) {
		this._navItems = this.removeSpecialLinkIfSpecialsAreDisabled(val);
	}

	removeSpecialLinkIfSpecialsAreDisabled = (mainNav: any) =>
		this.appSettingsService.getSetting('showSpecials')
			? mainNav
			: mainNav.filter((item: any) => item.text.toLowerCase() !== 'specials');
}
