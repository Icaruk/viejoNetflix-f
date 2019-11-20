import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable({
	providedIn: "root"
})
export class MovieService {
	apiUrl = "http://localhost:3000";
	token = "5dd2ae7bd274334cd8a07cc2";
	
	
	constructor(private httpClient: HttpClient) {}

	getHomeMovies(limit: number = 10): Observable<object> {
		
		
		return this.httpClient.get(
			`${this.apiUrl}/movie/popular?limit=${limit}&token=${this.token}`
		);
	};
	
	getMovieByTitle(title: string, limit: number = 30) {
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?limit=${limit}&title=${title}&token=${this.token}`
		);
	};
	
	getMovieById(id: string) {
		return this.httpClient.get(
			`${this.apiUrl}/movie/search?id=${id}&token=${this.token}`
		);
	};
	
	

	/*
	getMoviesByCategory(category: string): Observable<object> {
		return this.httpClient.get(
			`${this.apiUrl}movie/${category}?api_key=${this.apiKey}&language=es-ES`
		);
	}
	*/
}
