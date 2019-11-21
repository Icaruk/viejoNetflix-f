import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";

@Component({
	selector: "app-movie-list",
	templateUrl: "./movie-list.component.html",
	styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
	
	movieList: Array<any>;
	
	constructor(private movieService:MovieService) {}
	
	ngOnInit() {
		
		this.movieService.getHomeMovies(10).subscribe(
			res => this.movieList = res['results'],	// guardo los resultados en movieList para poder acceder desde el HTML
			err => console.log("ERROR component movie", err)
		);
		
		
	};
}
