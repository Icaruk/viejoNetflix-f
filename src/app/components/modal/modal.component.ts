import { Component, OnInit, Input } from "@angular/core";
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
	@Input()
	movie: any;
	
	isVisible: boolean = false;
	constructor(private movieService: MovieService) {}
	
	
	ngOnInit() {
		// console.log( this.movie );
	}
	
	openDialog() {
		
		let movie = this.movie;
		
		
		// Preparo la info para enviar al HTML
		movie.releaseYear = new Date(movie.release_date).getFullYear();
		movie.strGenres = "";
		
		for (let _id of movie.genre_ids) {
			movie.strGenres += `${this.movieService.idToGenre(_id)} `;
		};
		
		
		// Muestro
		this.isVisible = true;
		
	}
	
	closeDialog(ev) {
		
		// He pulsado sobre la X roja (no recibo $event)
		if (!ev) {
			this.isVisible = false;
			return;
		};
		
		
		// He pulsado sobre algo
		if (ev.target.id) {
			if (ev.target.id === "fondoModal") { // ese algo, es el fondo
				this.isVisible = false;
			};
		};
		
	}
	
}
