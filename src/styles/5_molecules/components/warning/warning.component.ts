import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// This is intended to be used as an HTML component on legacy for V1

@Component({
	selector: 'cdx-warning',
	templateUrl: './warning.component.html',
	styleUrls: ['./warning.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningComponent implements OnInit {
	@Input('isVisible') isVisible = false;
	@Input('hasCloseButton') hasCloseButton = true;
	@Input('message') message = '';

	ngOnInit() {
		console.warn('This is intended to be used as an HTML component on legacy for V1');
	}
}
