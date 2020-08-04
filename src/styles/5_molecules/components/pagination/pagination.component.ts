import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, HostBinding } from '@angular/core';

@Component({
	selector: 'cdx-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
	pageCount = 0;
	pages: number[] = [];
	@Input() ellipses = true;
	@Input() currentPage = 1;
	@Input() collectionSize: number;
	@Input() pageSize: number;
	@Input() maxSize = 3; // maximum pages to display
	@Input() rotate = false;

	@HostBinding('attr.role') role = 'navigation';

	@Output() pageChange: EventEmitter<number> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		this.updatePages(this.currentPage);
	}

	applyEllipses(start: number, end: number) {
		if (this.ellipses) {
			if (end < this.pageCount) {
				if (end < this.pageCount - 1) {
					this.pages.push(-1);
				}
				this.pages.push(this.pageCount);
			}
		}
	}

	applyPagination(): [number, number] {
		if (this.currentPage === this.pageCount) {
			return [this.currentPage - this.maxSize - 1, this.currentPage];
		}
		const page = Math.ceil(this.currentPage / this.maxSize) - 1;
		const start = page * this.maxSize;
		const end = start + this.maxSize;

		return [start, end];
	}

	applyRotation(): [number, number] {
		let start = 0;
		let end = this.pageCount;
		const leftOffset = Math.floor(this.maxSize / 2);
		const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

		if (this.currentPage <= leftOffset) {
			// very beginning, no rotation -> [0..maxSize]
			end = this.maxSize;
		} else if (this.pageCount - this.currentPage < leftOffset) {
			// very end, no rotation -> [len-maxSize..len]
			start = this.pageCount - this.maxSize;
		} else {
			// rotate
			start = this.currentPage - leftOffset - 1;
			end = this.currentPage + rightOffset;
		}

		return [start, end];
	}

	hasPrevious(): boolean {
		return this.currentPage > 1;
	}

	hasNext(): boolean {
		return this.currentPage < this.pageCount;
	}

	isEllipsis(pageNumber): boolean {
		return pageNumber === -1;
	}

	nextDisabled(): boolean {
		return !this.hasNext();
	}

	previousDisabled(): boolean {
		return !this.hasPrevious();
	}

	selectPage(pageNumber: number): void {
		if (!pageNumber || pageNumber > this.pageCount) return;
		this.updatePages(pageNumber);
	}

	setPageInRange(newPageNo) {
		const prevPageNo = this.currentPage;
		this.currentPage = newPageNo;

		if (this.currentPage !== prevPageNo && this.collectionSize) {
			this.pageChange.emit(this.currentPage);
		}
	}

	updatePages(newPage: number) {
		this.pageCount = Math.ceil(this.collectionSize / this.pageSize);

		if (!this.pageCount) {
			this.pageCount = 0;
		}
		this.pages.length = 0;
		for (let i = 1; i <= this.pageCount; i++) {
			this.pages.push(i);
		}
		this.setPageInRange(newPage);

		if (this.maxSize > 0 && this.pageCount > this.maxSize) {
			let start = 0;
			let end = this.pageCount;

			// either paginating or rotating page numbers
			if (this.rotate) {
				[start, end] = this.applyRotation();
			} else {
				[start, end] = this.applyPagination();
			}
			this.pages = this.pages.slice(start, end);
			this.applyEllipses(start, end);
		}
	}

	loadMore() {
		if (!this.hasNext()) return;
		this.currentPage += 1;
		this.pageChange.emit(this.currentPage);
	}
}
