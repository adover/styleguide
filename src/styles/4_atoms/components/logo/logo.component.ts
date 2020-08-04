import { Component, Input } from '@angular/core';

/**
 * @description
 * @export
 */
@Component({
	selector: 'cdx-logo',
	template: `
		<ng-container *ngIf="link; then linkImage; else logoImage"></ng-container>
		<ng-template #linkImage>
			<a href="{{ link }}" title="{{ altText }}">
				<ng-container *ngTemplateOutlet="logoImage"></ng-container>
			</a>
		</ng-template>
		<ng-template #logoImage>
			<img [src]="logoUrl" alt="{{ altText }}" />
		</ng-template>
	`,
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
	@Input() type: 'landscape' | 'portrait' | 'wapple' = 'landscape';
	@Input() background: 'dark' | 'light' = 'light';
	@Input() link: string;
	@Input() altText: string;

	get backgroundString() {
		return this.background === 'dark' && this.type !== 'wapple' ? '_dark' : '';
	}

	get logoUrl() {
		return `/logos/cd_logo_${this.type}${this.backgroundString}.svg`;
	}
}
