import { query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { fadeInSteps, fadeOutSteps, slideDownSteps, slideUpSteps } from '../../../animations';
import { Router } from '@angular/router';
import { HistoryService } from '../../../services';

@Component({
	selector: 'cdx-routed-modal-base',
	template: ``,
	host: {
		'[@modalOneView]': '',
	},
	animations: [
		// Define animations for the ROUTABLE VIEW itself, which has a HOST BINDING for
		// this animation trigger.
		trigger('modalOneView', [
			transition(':enter', [
				// Since we're going to be animating the modal in from an off-
				// screen location, we want to disable any local overflow so that
				// we don't see the interim scrollbars.
				style({
					overflow: 'hidden',
				}),
				query('.modal-backdrop', fadeInSteps, { optional: true }),
				query('.modal-contentContainer', slideUpSteps, { optional: true }),
			]),
			transition(':leave', [
				// Since we're going to be animating the modal out to an off-
				// screen location, we want to disable any local overflow so that
				// we don't see the interim scrollbars.
				style({
					overflow: 'hidden',
				}),
				query('.modal-contentContainer', slideDownSteps, { optional: true }),
				query('.modal-backdrop', fadeOutSteps, { optional: true }),
			]),
		]),
	],
})
export class RoutedModalBaseComponent {
	public constructor(protected router: Router, protected historyService: HistoryService) {}

	close() {
		this.router.navigateByUrl(this.historyService.getPreviousNonModalUrl());
	}

	goBack() {
		this.router.navigateByUrl(this.historyService.getPreviousUrl());
	}
}
