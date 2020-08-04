import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { CTA, PaddingSize } from '../../../ui-models';

@Component({
	selector: 'cdx-cta, [cdxCta]',
	template: `
		<cdx-card [padding]="padding">
			<a
				(mouseenter)="hover(true)"
				(mouseleave)="hover(false)"
				class="cta-cover _noajax"
				[ngClass]="cta?.action?.class"
				*ngIf="cta?.action?.link"
				[attr.href]="cta?.action?.link"
				aria-label="linkText"
			></a>
			<figure>
				<img deferLoad [src]="cta?.image.src" [alt]="cta?.image.alt" />
			</figure>
			<div class="cta-caption" *ngIf="cta?.action" [ngClass]="{ 'cta-caption--underlay': cta?.action?.underlay }">
				<h4 *ngIf="cta?.content">{{ cta?.content }}</h4>
				<button [ngClass]="{ hover: isHovering }" cdxButton fillStyle="outline" [fullWidth]="true">
					{{ cta?.action?.title }}
				</button>
			</div>
		</cdx-card>
	`,
	styleUrls: ['./cta.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent implements OnInit {
	_cta: CTA;
	padding = PaddingSize.None;

	@HostBinding('attr.data-type') type: 'card' | 'image';

	@Input() set cta(cta: CTA) {
		this.type = cta.content ? 'card' : 'image';

		this._cta = cta;
	}

	get cta() {
		return this._cta;
	}

	isHovering = false;

	ngOnInit() {
		if (!this.cta || !this.cta.image) {
			console.error('[CTAComponent]: I need an image');
		}
	}

	hover(isHovering) {
		this.isHovering = isHovering;
	}
}
