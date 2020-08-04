import { animate, query, style, transition, trigger } from '@angular/animations';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	HostBinding,
	Inject,
	OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { THEME_CONSTANTS } from '../../../1_settings/theme';
import {
	AppSettingsService,
	BreakPointService,
	CustomWindow,
	Device,
	GigyaService,
	LocalStorageService,
	WINDOW,
} from '../../../services';

@UntilDestroy()
@Component({
	animations: [
		trigger('slideUp', [
			transition(':enter', [
				style({ transform: 'translateY(100px)', opacity: 0 }),
				query('.olive-openButtonCalloutAnimationWrapper', style({ width: 0, opacity: 0 })),
				animate(
					`${THEME_CONSTANTS.transitions.medium} ${THEME_CONSTANTS.transitions.long} ${THEME_CONSTANTS.easings['ease-out-back']}`,
					style({ transform: 'translateY(0)', opacity: 1 })
				),
				query(
					'.olive-openButtonCalloutAnimationWrapper',
					animate(
						`${THEME_CONSTANTS.transitions.short} ${THEME_CONSTANTS.easings['ease-out-back']}`,
						style({ width: '*', opacity: 1 })
					)
				),
			]),
		]),
	],
	selector: 'cdx-olive-roundel',
	template: `
		<button
			attr.aria-label="Open Olive chat window"
			class="olive-openButton"
			(click)="showChatWidget()"
			*ngIf="canShowOlive && !chatWidgetIsActive"
			cdxButton
			fillStyle="flat"
			[@slideUp]
		>
			<img
				src="https://static.countdown.co.nz/assets/images/Olive/olive-roundel.png"
				width="76"
				height="77"
				alt="Olive Roundel"
			/>
			<div class="olive-openButtonCalloutAnimationWrapper">
				<span class="olive-openButtonCallout">Ask Olive</span>
			</div>
		</button>
	`,
	styleUrls: ['./olive-roundel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OliveRoundelComponent implements OnInit, AfterViewInit {
	@HostBinding('class.oliveRoundel') cls = true;

	canShowOlive = false;
	chatWidgetIsActive = false;
	setFullScreen = false;
	// Future requirement for hiding certain parts of the roundel, like the text
	useLocalStorage = false;

	constructor(
		@Inject(WINDOW) private window: CustomWindow,
		private appSettingsService: AppSettingsService,
		private breakpointService: BreakPointService,
		private gigyaService: GigyaService,
		private localStorageService: LocalStorageService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.canShowOlive = this.window && this.window.OliveChatHelper;
	}

	ngAfterViewInit() {
		this.breakpointService.device$.pipe(untilDestroyed(this)).subscribe((d: Device) => {
			this.setFullScreen = d === Device.MOBILE;
		});

		this.initOliveChat();
	}

	initOliveChat() {
		if (!this.canShowOlive) return;

		const chatWidgetUrl = this.appSettingsService.getSetting('chatWidgetUrl');
		if (this.localStorageService.getItem('chatWidget-isChatStarted')) {
			this.localStorageService.setItem('chatWidget-isChatStarted', '');
		}

		this.window.OliveChatHelper.appendOliveChatToHead(chatWidgetUrl);
		this.cdr.markForCheck();
	}

	pollLocalStorageToSeeIfClosed() {
		if ((this.localStorageService.getItem('chatWidget-isChatStarted') || '').toLowerCase() === 'started') {
			setTimeout(() => {
				this.pollLocalStorageToSeeIfClosed();
			}, 1000);

			return;
		}

		this.chatWidgetIsActive = false;
		this.cdr.markForCheck();
	}

	showChatWidget() {
		const setFullScreen = this.setFullScreen;

		this.chatWidgetIsActive = true;

		if (typeof this.window.chatWidget.onStartChat !== 'function') {
			setTimeout(() => {
				this.showChatWidget();
			}, 1000);

			return;
		}

		this.pollLocalStorageToSeeIfClosed();
		this.window.chatWidget.onStartChat({ setFullScreen });
		this.gigyaService.notifyOliveWidget();
		this.cdr.markForCheck();
	}
}
