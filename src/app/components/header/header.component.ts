import { Component, OnInit } from "@angular/core";
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	
	constructor(
		private userService: UserService,
		private movieService: MovieService,
		private router: Router
	) {}

	ngOnInit() {};
	
	
	
	search(ev) {
		
		let title = ev.target.value;
		
		if (title.length >= 3) {
			
			this.router.navigate(["/search"]);
			
			
			this.movieService.getMovieByTitle(title, 10).subscribe(
				(res) => {
					this.movieService.setMoviesFound( res["results"] );
				},
				(err) => {
					console.log( err );
				}
			)
			
		};
		
		
		
	}
	
	
}
