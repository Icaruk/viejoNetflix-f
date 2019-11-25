import { Component, OnInit } from "@angular/core";
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	
	constructor(
		private userService: UserService,
		private movieService: MovieService
	) {}

	ngOnInit() {};
	
	
	
	search(ev) {
		
		let title = ev.target.value;
		
		if (title.length >= 3) {
			
			console.log( title );
			
			
			this.movieService.getMovieByTitle(title, 10).subscribe(
				(res) => {
					// this.movieService["moviesFound"] = res["results"];
					this.movieService.setMoviesFound( res["results"] );
					console.log( res );
				},
				(err) => {
					console.log( err );
				}
			)
			
		};
		
		
		
	}
	
	
}
