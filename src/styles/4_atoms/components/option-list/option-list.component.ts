import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { OptionListItemComponent } from '../option-list-item/option-list-item.component';
import {
	Component,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	Output,
	ViewChildren,
	QueryList,
	AfterViewInit,
} from '@angular/core';

@Component({
	selector: 'cdx-option-list',
	template: `
		<ul *ngIf="listItems" role="list">
			<cdx-option-list-item
				*ngFor="let item of listItems; let index = index"
				[itemLabel]="item[displayKey]"
				class="list-group-item"
				(click)="onClick(index)"
			>
				{{ item[displayKey] }}
			</cdx-option-list-item>
			<cdx-option-list-item class="list-group-item" [noPadding]="true">
				<ng-content></ng-content>
			</cdx-option-list-item>
		</ul>
	`,
	styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements AfterViewInit {
	activeItemDisplayText: string;
	selectedOptionIndex = -1;
	private keyManager: ActiveDescendantKeyManager<OptionListItemComponent>;

	@ViewChildren(OptionListItemComponent) items: QueryList<OptionListItemComponent>;
	@Input() listItems: any[];
	@Input() displayKey: string;
	@Output() optionSelect: EventEmitter<any> = new EventEmitter();

	@HostBinding('attr.role') role = 'listbox';
	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		if (event.keyCode === ENTER && this.keyManager.activeItem) {
			const activeItemIndex = this.keyManager.activeItemIndex;
			const activeItem = this.listItems[activeItemIndex];
			if (!activeItem) return;
			this.optionSelect.emit(activeItem);
		} else {
			this.keyManager.onKeydown(event);
		}
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap().withTypeAhead();
	}

	onClick(index: string | number) {
		this.optionSelect.emit(this.listItems[index]);
	}
}
