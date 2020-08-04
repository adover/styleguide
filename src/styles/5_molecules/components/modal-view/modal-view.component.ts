import { animateChild, query, transition, trigger } from '@angular/animations';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'cdx-modal-view',
	host: {
		'[@modalView]': 'checkOutlet()',
	},
	animations: [
		trigger('modalView', [
			// If this modal-view is rendered as part of a page refresh, we don't
			// want to include any animations - animations are for mental modal; and,
			// if this is the initial page load, there can be no meaningful mental
			// model portrayed for the user and the modal window. As such, we need to
			// denote the modal-view has having a "transition" so that the nested
			// view transitions will be inherently blocked.
			transition('-1 => 0', []),
			// While we don't want a transition on page-refresh, we certainly do want
			// the animations to play when the modal-view is opened or closed during
			// the normal control flow of the application. As such, for the :enter
			// :leave transitions, we want to query for the router-outlet component
			// and ask its animations to run (if it has any).
			transition('0 => 1, 1 => 0, * => 0', [
				// As the modal-view enters or leaves, we want to allow any of
				// nested view animations to execute.
				// --
				// CAUTION: This query selector does not get the simulated
				// encapsulation attribute selectors. This will go DEEP through
				// the descendant DOM tree if you're not careful. As such, we
				// MUST USE the "limit" property to prevent deeper matches from
				// being exercised.
				query('@*', animateChild(), {
					limit: 1,
					optional: true,
				}),
			]),
			// By default, we want to block all nested animations (and then
			// selectively re-enable them using the transitions above). As such, we
			// have to define a generic no-op transition from every state to every
			// other state. This transition will inherently block the transitions
			// contained within any nested views.
			transition('* <=> *', []),
		]),
	],
	template: `
		<router-outlet name="modal"></router-outlet>
	`,
})
export class ModalViewComponent implements OnInit {
	scrollStrategy: BlockScrollStrategy;
	curModal: string;
	modalState = -1;
	@ViewChild(RouterOutlet) routerOutlet: RouterOutlet;

	constructor(
		private router: Router,
		private viewportRuler: ViewportRuler,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit() {
		this.scrollStrategy = new BlockScrollStrategy(this.viewportRuler, this.document);
		this.modalState = this.router.navigated ? 0 : -1;
	}

	/**
	 * Keep track of which modal, if any, is open.
	 * This allows us to transition open and close and not transition between modals
	 */
	checkOutlet() {
		if (this.routerOutlet?.isActivated) {
			const name = this.routerOutlet?.activatedRoute?.firstChild?.snapshot?.data?.name;
			if (name) {
				if (this.curModal !== name) {
					this.curModal = name;
					this.modalState++;
					this.scrollStrategy.enable();
				}
			} else {
				// No modal open
				this.modalState = 0;
				this.curModal = '';
				this.scrollStrategy.disable();
			}
			return this.modalState;
		}
		// Unactivated, only happens on page load.
		return -1;
	}
}
