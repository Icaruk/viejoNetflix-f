import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/services/movie.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	
	mostPopularMovies: Array<any>;

	constructor(private movieService: MovieService) {}

	
	
	ngOnInit() {
		
		
		// let ele = document.querySelector(".scrolling-wrapper");
		
		// window.addEventListener("wheel", function(e) {
		// 	if (e.deltaY > 0) ele.scrollLeft += 100;
		// 	else ele.scrollLeft -= 100;
		// });		
		
		
		
		this.movieService.getMostPopularMovies(10).subscribe(
			
			(res) => {
				this.mostPopularMovies = res['results']; // guardo los resultados para poder acceder desde el HTML
			},	
			
			err => console.log(err)
			
		);
		
		
	};
}
