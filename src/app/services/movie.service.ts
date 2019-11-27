import { Injectable, OnInit } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { UserService } from './user.service';



@Injectable({
	providedIn: "root"
})
export class MovieService implements OnInit {
	
	apiUrl: string = "http://localhost:3000";
	
	moviesFound: Array<any> = [];
	
	
	
	constructor(private httpClient: HttpClient, private userService: UserService) {}
	
	ngOnInit () {
		
	};
	
	
	getQueryOptions() {
		
		let limit = 10;
		let token = this.userService.getToken();
		
		if (token) {
			limit = 200;
		};
		
		return {
			limit: limit,
			token: token
		};
		
	};
	
	
	
	getMostPopularMovies(): Observable<object> {
		
		let options = this.getQueryOptions();
		
		return this.httpClient.get(
			`${this.apiUrl}/movie/popular?limit=${options.limit}&token=${options.token}`
		);
	};
	
	getMovieByTitle(title: string) {
		
		let options = this.getQueryOptions();
		
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?limit=${options.limit}&title=${title}&token=${options.token}`
		);
	};
	
	getMoviesByGenre(idGenre: number) {
		
		let options = this.getQueryOptions();
		
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?limit=${options.limit}&genre=${idGenre}&token=${options.token}`
		);
	};
	setMoviesFound(movies: Array<any>) {
		this.moviesFound = movies;
	};
	getMoviesFound(): Array<any> {
		return this.moviesFound;
	};
	
	
	
	getMovieById(id: string) {
		
		let options = this.getQueryOptions();
		
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?id=${id}&token=${options.token}`
		);
	};	
	

	
	
	idToGenre (id: any, returnGenre = true): any {
		// idToGenre(12); 					// "Aventura"
		// idToGenre("Comedia", false); 	// 35
		// idToGenre("getObj")				// Devuelve el objeto "traductor"
		
		const traductor = {
			
			12: "Aventura",
			14: "Fantasía",
			18: "Drama",
			16: "Animación",
			27: "Terror",
			28: "Acción",
			35: "Comedia",
			36: "Historia",
			53: "Suspense",
			37: "Western",
			80: "Crimen",
			99: "Documental",
			878: "Ciencia ficción",
			9648: "Misterio",
			10402: "Música",
			10751: "Familia",
			10749: "Romance",
			10770: "Película de TV",
			10752: "Bélica"
			
		};
		
		
		
		if (id === "getObj") {
			return traductor;
		};
		
		
		// id --> genre
		if (returnGenre) {
			
			let res: any = traductor[id];
			
			if (res) {
				return res;
			} else {
				return "";
			};
			
			
		// genre --> id
		} else {
			
			let res: any = -1;
			
			// Itero todas las keys
			for (let _x in traductor) {
				if (traductor[_x] == id) { // la propiedad de esa key coincide con el value que estoy buscando
					res = _x;
					break;
				};
			};
			
			
			return res;
			
		};
		
	};	
	
	
	/*
	getMoviesByCategory(category: string): Observable<object> {
		return this.httpClient.get(
			`${this.apiUrl}movie/${category}?api_key=${this.apiKey}&language=es-ES`
		);
	}
	*/
}
