import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
	@Input()
	movie: any;
	
	show:boolean
	constructor() {}

	ngOnInit() {
		console.log( this.movie );
	}

	
	
	openDialog() {
		this.show = true;
		console.log(this.movie.id);
	}
}
