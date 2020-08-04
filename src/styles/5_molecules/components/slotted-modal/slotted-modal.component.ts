import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from '../../../services/history.service';
import { ModalSize, PaddingSize } from '../../../ui-models';

@Component({
	selector: 'cdx-slotted-modal',
	templateUrl: './slotted-modal.component.html',
	styleUrls: ['./slotted-modal.component.scss'],
})
export class SlottedModalComponent {
	@Input() size: ModalSize = ModalSize.Full;
	@Input() center = false;
	@Input() padding = PaddingSize.Medium;
	@Input() canDismiss = true;
	@Input() canGoBack = false;
	@Input() mobileFullHeight = false;

	constructor(private historyService: HistoryService, private router: Router) {}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		// 'Esc' is IE/Edge specific, it's 'Escape' in every other browser
		if (event.key === 'Esc' || event.key === 'Escape') {
			this.close();
			event.preventDefault();
		}
	}

	close() {
		this.router.navigateByUrl(this.historyService.getPreviousNonModalUrl());
	}
}
