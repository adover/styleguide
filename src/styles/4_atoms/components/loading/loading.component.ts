import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'cdx-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
	@HostBinding('attr.data-fill')
	@Input()
	fill: 'dark' | 'light' | 'highlight' | 'mid' | 'green' = 'light';

	@HostBinding('attr.data-vertical-center')
	@Input()
	verticalCenter: boolean;

	@HostBinding('attr.aria-live') live = 'polite';
}
