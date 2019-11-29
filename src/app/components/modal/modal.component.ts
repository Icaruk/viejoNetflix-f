import { Component, OnInit, Input } from "@angular/core";
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { NexusService } from 'src/app/services/nexus.service';

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
	@Input()
	movie: any;
	relatedMovies: any;
	
	
	isVisible: boolean = false;
	constructor(
		private movieService: MovieService,
		private router: Router,
		private nexusService: NexusService
	) {}
	
	
	ngOnInit() {
	}
	
	openDialog() {
		
		let movie = this.movie;
		
		
		// Preparo la info para enviar al HTML
		movie.releaseYear = new Date(movie.release_date).getFullYear();
		movie.strGenres = "";
		
		for (let _id of movie.genre_ids) {
			movie.strGenres += `${this.movieService.idToGenre(_id)} `;
		};
		
		
		this.movieService.getMoviesByGenre(movie.genre_ids[0]).subscribe(
			(res: any) => {
				
				let allMovies = res.results;
				let maxIdx = res.total_results;
				this.relatedMovies = [];
				
				let idxUsados = [];
				
				
				// 3 veces
				let v = 1;
				while (v <= 4) {
					
					// Hago random
					let rnd = Math.ceil ( Math.random() * maxIdx );
					
					// No lo he usado
					if (!idxUsados.includes(rnd)) {
						
						let movie = allMovies[rnd];
						
						if (movie.poster_path) { // tiene portada
							this.relatedMovies.push(movie); // meto la peli
							idxUsados.push(rnd); // meto el rnd como usado
							v ++; // avanzo
						};

					};
					
				};
				
				
				
				
			},
			(err) => {
				console.log( err );
			}
		)
		
		
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
	
	pulsaOrder(movieData: any) {
		this.nexusService.setData("newOrderData", movieData);
		this.router.navigate(['/orders/new']);
	}
	
}
