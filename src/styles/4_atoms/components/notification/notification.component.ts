import { THEME_CONSTANTS } from '../../../1_settings/theme';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'cdx-notification',
	template: `
		<cdx-svg-icon *ngIf="iconName" size="small" [name]="iconName" [fill]="colour"></cdx-svg-icon>
		<p i18n="@@notifcation">
			{{ content }}
		</p>
	`,
	styleUrls: ['./notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('doAnimation', [
			state(
				'true',
				style({
					opacity: 1,
				})
			),
			state(
				'false',
				style({
					opacity: 0,
				})
			),
			transition('1 => 0', [animate(`${THEME_CONSTANTS.transitions.default} ease-in`)]),
			transition('0 => 1', [animate(`${THEME_CONSTANTS.transitions.short} ease-out`)]),
		]),
	],
})
export class NotificationComponent {
	@HostBinding('attr.aria-live') ariaLive = 'assertive';

	@HostBinding('@doAnimation')
	@Input()
	canShow = false;

	@Input() content: string;
	@Input() iconName: string;

	@HostBinding('attr.data-floating')
	@Input()
	floating: false;

	@HostBinding('attr.data-colour')
	@Input()
	colour: 'dark' | 'light' | 'green';
}
