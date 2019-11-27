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
	
	username: string;
	
	
	constructor(
		private userService: UserService,
		private movieService: MovieService,
		private router: Router
	) {}

	ngOnInit() {
		this.username = this.userService.getSessionData().username;
	};
	
	
	
	search(ev) {
		
		let title = ev.target.value;
		
		if (title.length >= 3) {
			
			this.router.navigate(["/search"]);
			
			
			this.movieService.getMovieByTitle(title).subscribe(
				(res) => {
					this.movieService.setMoviesFound( res["results"] );
				},
				(err) => {
					console.log( err );
				}
			)
			
		};
		
		if (title.length === 0) {
			this.router.navigate(["/"]);
		};
		
		
		
	}
	
	
}
