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
	
	generos: Array<any> = []; // lo relleno abajo
	selected: any; // aquí se pondrá idGenero
	
	
	
	constructor(private movieService: MovieService) {}
	
	
	searchByGenre(idGenre) {
		
		// Convierto el id a género y lo pongo en el botón
		// let strGenre = this.movieService.idToGenre(idGenre, true);
		// document.getElementById("botonDropdown").innerHTML = `Genre: ${strGenre}`;
		
		
		// Espero respuesta
		this.movieService.getMoviesByGenre(idGenre).subscribe(
			res => {
				this.genreMovies = res["results"]; // guardo los resultados para poder acceder desde el HTML
			},
			err => {
				console.log(err);
			}
		);
		
	}
	
	ngOnInit() {
		/*
		let ele = document.querySelector(".scrolling-wrapper");
		
		window.addEventListener("wheel", function(e) {
			if (e.deltaY > 0) ele.scrollLeft += 100;
			else ele.scrollLeft -= 100;
		});
		*/
		
		// Saco todas las parejas de (genero + idGenero)
		let traductor = this.movieService.idToGenre("getObj");	
		
		
		// Itero
		for (let _x in traductor) {
			this.generos.push([_x, traductor[_x] ]); // [idGenero, strGenero]
		};
		
		
		// Selecciono una categoría por defecto
		let randomGenre = this.generos [Math.floor (Math.random() * (this.generos.length) )];
		
		this.selected = randomGenre[0];
		this.searchByGenre (randomGenre[0]);
		
		
		
		// Saco las pelis populares
		this.movieService.getMostPopularMovies(10).subscribe(
			res => {
				this.mostPopularMovies = res["results"]; // guardo los resultados para poder acceder desde el HTML
			},
			
			err => console.log(err)
		);
	}
}
