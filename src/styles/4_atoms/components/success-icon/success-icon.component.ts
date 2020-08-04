import { animate, style, transition, trigger } from '@angular/animations';
import { THEME_CONSTANTS } from '../../../1_settings/theme';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
	animations: [
		trigger('animate', [
			transition(':enter', [
				style({ 'clip-path': 'polygon(0 0, 0 0, 0 100%, 0 100%)' }),
				animate(
					`${THEME_CONSTANTS.transitions.default}`,
					style({ 'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' })
				),
			]),
		]),
	],
	selector: 'cdx-success-icon',
	template: `
		<cdx-svg-icon fill="light" size="small" name="tick" [@animate]></cdx-svg-icon>
	`,
	styleUrls: ['./success-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessIconComponent implements OnInit {
	constructor() {}

	transition = THEME_CONSTANTS.transitions.default;

	@Output() animationCompleteEmitter: EventEmitter<any> = new EventEmitter();

	ngOnInit(): void {
		// IE11 doesn't support clip-path so just timeout instead
		setTimeout(() => {
			this.animationComplete();
		}, parseInt(this.transition, 10));
	}

	animationComplete() {
		this.animationCompleteEmitter.emit();
	}
}
