import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable({
	providedIn: "root"
})
export class MovieService {
	
	apiUrl = "http://localhost:3000";
	token = "asd";
	
	moviesFound: Array<any> = [];
	
	
	
	constructor(private httpClient: HttpClient) {}
	
	getMostPopularMovies(limit: number = 10): Observable<object> {
		return this.httpClient.get(
			`${this.apiUrl}/movie/popular?limit=${limit}&token=${this.token}`
		);
	};
	
	getMovieByTitle(title: string, limit: number = 10) {
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?limit=${limit}&title=${title}&token=${this.token}`
		);
	};
	
	getMovieById(id: string) {
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?id=${id}&token=${this.token}`
		);
	};
	
	getMoviesByGenre(idGenre: number, limit: number = 10) {
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?limit=${limit}&genre=${idGenre}&token=${this.token}`
		);
	}
	
	
	
	setMoviesFound(movies: Array<any>) {
		this.moviesFound = movies;
	}
	getMoviesFound(): Array<any> {
		return this.moviesFound;
	}
	
	
	idToGenre (id: any, returnGenre = true): any {
		// idToGenre(12); 					// "Aventura"
		// idToGenre("Comedia", false); 	// 35
		
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
