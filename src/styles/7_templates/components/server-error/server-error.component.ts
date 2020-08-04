import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'wnz-server-error',
	template: `
		<h1>500</h1>
		<h2>Internal Server Error</h2>
		<p>Please try again later or feel free to contact us if problem persists</p>
	`,
	styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent {}
