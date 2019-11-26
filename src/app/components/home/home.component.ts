import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	
	mostPopularMovies: Array<any>;
	genreMovies: Array<any>;
	
	
	constructor(private movieService: MovieService) {}
	
	
	searchByGenre(idGenre: number) {
		
		// Convierto el id a género y lo pongo en el botón
		let strGenre = this.movieService.idToGenre(idGenre, true);
		// document.getElementById("botonDropdown").innerHTML = `Genre: ${strGenre}`;
		
		// Espero respuesta
		this.movieService.getMoviesByGenre(idGenre).subscribe(
			(res) => {
				this.genreMovies = res["results"]; // guardo los resultados para poder acceder desde el HTML
			},
			(err) => {
				console.log( err );
			}
		);
	};
	
	
	
	ngOnInit() {
		
		/*
		let ele = document.querySelector(".scrolling-wrapper");
		
		window.addEventListener("wheel", function(e) {
			if (e.deltaY > 0) ele.scrollLeft += 100;
			else ele.scrollLeft -= 100;
		});
		*/
		
		this.searchByGenre(12);
		
		/*
		document.getElementById("botonDropdown").addEventListener("click", (ev) => {
			document.getElementById("dropdown").classList.toggle("show");
		});
		*/
		
		/*
		// Ocultar dropdown al hacer click fuera
		window.onclick = function(ev) {
			
			let target = ev.target as HTMLInputElement;
			
			
			if (!target.matches(".dropbtn")) {
				
				let dropdowns = document.getElementsByClassName("dropdown-content");
				
				
				for (let i = 0; i < dropdowns.length; i++) {
					
					let openDropdown = dropdowns[i];
					
					if (openDropdown.classList.contains("show")) {
						openDropdown.classList.remove("show");
					};
				}
			};
		};
		*/
		
		
		
		this.movieService.getMostPopularMovies(10).subscribe(
			res => {
				this.mostPopularMovies = res["results"]; // guardo los resultados para poder acceder desde el HTML
			},

			err => console.log(err)
		);
	};
}
