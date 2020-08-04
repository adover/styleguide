import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CarouselDirective } from '../../../directives/carousel.directive';
import { AppSettingsService, BreakPointService, StatefulService } from '../../../services';
import { CTA } from '../../../ui-models';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';

export class CarouselState {
	componentWidth: number;
	containerWidth: number;
	currentPage = 1;
	itemCount: number;
	itemWidth: number;
	translate = 0;
}

@UntilDestroy()
@Component({
	selector: 'cdx-carousel',
	template: `
		<div class="carousel-wrapper">
			<article cdxCta [cta]="hero" *ngIf="hero?.image"></article>

			<div class="carousel-track" #container data-container="true">
				<ng-content></ng-content>
				<button
					class="carousel-button carousel-button--prev"
					aria-label="previous"
					(click)="prevClick()"
					*ngIf="displayMoveLeft"
				>
					<cdx-svg-icon size="small" name="chevron-left"></cdx-svg-icon>
				</button>
				<button
					class="carousel-button carousel-button--next"
					aria-label="next"
					(click)="nextClick()"
					*ngIf="displayMoveRight"
				>
					<cdx-svg-icon size="small" name="chevron-right"></cdx-svg-icon>
				</button>
			</div>
		</div>

		<nav
			role="navigation"
			aria-label="Carousel pagination"
			class="carousel-pagination"
			*ngIf="getPageCount()?.length > 1"
		>
			<ul>
				<li *ngFor="let p of getPageCount(); let i = index" [ngClass]="{ currentPage: i + 1 === state?.currentPage }">
					<button attr.aria-label="Page {{ i }}" (click)="paginationClick(i)"></button>
				</li>
			</ul>
		</nav>
	`,
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent extends StatefulService<CarouselState> implements OnInit, AfterViewInit, OnDestroy {
	@ContentChild(CarouselDirective)
	carouselContainer: CarouselDirective;

	@HostBinding('attr.aria-live') live = 'polite';
	@ViewChild('container') container: ElementRef;

	@Input() hero: CTA;
	@Input() autoRotate: Boolean = false;
	@Output() onAnimate: EventEmitter<number> = new EventEmitter();

	carouselElements: any[];
	timing = `${this.appSettingsService.getTransition('medium')} ${this.appSettingsService.getEasing('ease-in')}`;
	shadowTolerance = 0;
	timerId: number;

	get isOnFirstPage() {
		return this.state.currentPage === 1;
	}
	get isOnLastPage() {
		return this.state.currentPage >= this.getPageCount().length;
	}

	get displayMoveLeft() {
		return this.autoRotate ? this.autoRotate : !this.isOnFirstPage;
	}

	get displayMoveRight() {
		return this.autoRotate ? this.autoRotate : !this.isOnLastPage;
	}

	private player: AnimationPlayer;

	constructor(
		private cdr: ChangeDetectorRef,
		private builder: AnimationBuilder,
		public breakPointService: BreakPointService,
		private appSettingsService: AppSettingsService
	) {
		super(new CarouselState());
	}

	ngOnInit() {
		this.breakPointService.device$.pipe(untilDestroyed(this)).subscribe((device) => {
			this.timing = `${
				device === 'mobile'
					? this.appSettingsService.getTransition('short')
					: this.appSettingsService.getTransition('medium')
			} ${this.appSettingsService.getEasing('ease-in')}`;
		});
	}

	ngAfterViewInit(): void {
		this.carouselElements = Array.from(this.carouselContainer.el.nativeElement.children);
		this.initCarousel();
		this.onAnimate.emit(this.state.currentPage);
	}

	ngOnDestroy(): void {
		clearTimeout(this.timerId);
	}

	getItemsPerPage() {
		return Math.floor(this.state.containerWidth / this.state.itemWidth) || 1;
	}

	getPageCount(): any[] {
		if (!this.state.itemCount || isNaN(this.state.itemWidth)) return [];

		return new Array(Math.ceil(this.state.itemCount / this.getItemsPerPage()));
	}

	doAnimation(translate: number) {
		const anim: AnimationFactory = this.builder.build([
			animate(this.timing, style({ transform: `translateX(-${translate}px)` })),
		]);

		this.player = anim.create(this.carouselContainer.el.nativeElement);
		this.player.play();
		this.onAnimate.emit(this.state.currentPage);
	}

	getComputedItemWidth(item: Element) {
		if (!item) return;

		const computedStyle = window.getComputedStyle(item);

		return item.clientWidth + parseInt(computedStyle.marginLeft, 10) + parseInt(computedStyle.marginRight, 10);
	}

	getTranslateAmount(page: number) {
		const itemsAfterCurrent = page * this.getItemsPerPage() - this.state.itemCount;
		const isLastPage = itemsAfterCurrent > 0;

		if (isLastPage) {
			return (this.state.itemCount - this.getItemsPerPage()) * this.state.itemWidth;
		}

		return (page - 1) * this.getItemsPerPage() * this.state.itemWidth;
	}

	getVisibleCarouselItems() {
		return (this.carouselElements || []).filter((el) => getComputedStyle(el).display !== 'none');
	}

	@HostListener('window:resize', ['$event'])
	handleResize(event: any) {
		this.initCarousel();
	}

	initCarousel() {
		if (!this.container.nativeElement) return;

		this.setState({
			itemCount: this.getVisibleCarouselItems().length,
			itemWidth: this.getComputedItemWidth(this.getVisibleCarouselItems()[0]),
			containerWidth: (this.container.nativeElement as HTMLElement).offsetWidth,
		});

		// Force redraw on next tick
		setTimeout(() => {
			this.cdr.markForCheck();
		});

		if (this.autoRotate && !this.timerId) {
			this.timerId = window.setTimeout(this.nextClick.bind(this), 5000);
		}
	}

	@HostListener('swipeleft')
	nextClick() {
		this.resetTimeout();

		const currentPage = this.state.currentPage < this.getPageCount().length ? this.state.currentPage + 1 : 1;
		const translate = this.getTranslateAmount(currentPage) + this.shadowTolerance;

		this.setState({
			currentPage,
			translate,
		});

		this.doAnimation(translate);
		this.cdr.markForCheck();
	}

	paginationClick(page: number) {
		this.resetTimeout();

		const currentPage = page + 1;
		const translate = this.getTranslateAmount(currentPage);

		this.setState({
			currentPage,
			translate,
		});

		this.doAnimation(translate);
		this.resetTimeout();
	}

	@HostListener('swiperight')
	prevClick() {
		this.resetTimeout();

		const currentPage = this.state.currentPage > 1 ? this.state.currentPage - 1 : this.getPageCount().length;
		const translate = this.getTranslateAmount(currentPage);

		this.setState({
			currentPage,
			translate,
		});

		this.doAnimation(translate);
		this.cdr.markForCheck();
	}

	resetTimeout = () => {
		if (this.autoRotate) {
			clearTimeout(this.timerId);
			this.timerId = window.setTimeout(this.nextClick.bind(this), 5000);
		}
	};
}
