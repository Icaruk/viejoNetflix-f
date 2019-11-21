import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
	providedIn: "root"
})
export class UserService {
	
	// Declaro los valores por defecto
	/*private sessionData: object = {
		username: "",
		userId: "",
		token: ""
	};
	*/
	
	
	constructor(private httpClient: HttpClient) {}
	
	
	register(register_body: any): Observable<object> {
		return this.httpClient.post(
			"http://localhost:3000/user/register",
			register_body
		);
	};
	
	login(login_body: any): Observable<object> {
		return this.httpClient.post("http://localhost:3000/user/login", login_body);
	};
	
	logout(): Observable<object> {
		
		let sessionData = this.getSessionData();
		
		if (!sessionData) {
			console.error( "user.service.logout: No hay sessionData" );
			return;
		};
		
		
		// Guardo el token
		let {token} = this.getSessionData();
		
		console.log( "1", token );
		
		// Borro datos de localStorage
		this.deleteSessionData();
		
		
		console.log( "2", token );
		console.log( `http://localhost:3000/user/logout?token=${token}`);
		
		
		// Llamo
		this.httpClient.get(`http://localhost:3000/user/logout?token=${token}`);
		
	};
	
	isLoggedIn(): boolean {
		return !!this.getSessionData();
	};
	
	
	
	getSessionData(): any {
		return JSON.parse (localStorage.getItem("sessionData"));
	};
	
	saveSessionData(sessionData: object): void {
		// userService.saveSessionData({username: "asd", userId: "4h6fsdh43", token: "5j64523hdx2"})
		
		localStorage.setItem ("sessionData", JSON.stringify (sessionData));
	};
	
	deleteSessionData(): void {
		localStorage.removeItem ("sessionData");
	};
	
}
