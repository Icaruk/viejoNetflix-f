import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



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
	
	
	constructor(private httpClient: HttpClient, private router: Router) {}
	
	
	register(register_body: any): Observable<object> {
		return this.httpClient.post(
			"http://localhost:3000/user/register",
			register_body
		);
	};
	
	login(login_body: any): Observable<object> {
		return this.httpClient.post("http://localhost:3000/user/login", login_body);
	};
	
	logout(): void {
		
		let sessionData = this.getSessionData();
		
		if (!sessionData) {
			console.error( "user.service.logout: No hay sessionData" );
			return;
		};
		
		
		// Guardo el token por valor (no por referencia)
		let {token} = sessionData;
		
		
		// Borro datos de localStorage
		this.deleteSessionData();
		
		
		// Llamo
		this.httpClient.get(`http://localhost:3000/user/logout?token=${token}`).subscribe();
		
		
		// Redirect
		this.router.navigate(["/"]);
		
	};
	
	
	
	getProfile(): Observable<object> {
		
		let sessionData = this.getSessionData();
		
		if (!sessionData) {
			console.error( "user.service.profile: No hay sessionData" );
			return;
		};
		
		
		// Guardo el token por valor (no por referencia)
		let {userId, token} = sessionData;
		console.log( sessionData );
		console.log( `http://localhost:3000/user/${userId}?token=${token}` );
		
		// Llamo
		return this.httpClient.get(`http://localhost:3000/user/${userId}?token=${token}`);
	};
	
	
	
	isLoggedIn(): boolean {
		return !!this.getSessionData();
	};
	
	// getSessionData(): any {
	// 	return JSON.parse (localStorage.getItem("sessionData"));
	// };
	
	getSessionData(key?: string): any {
		// key: username, clientId, token
		
		let sessionData = JSON.parse (localStorage.getItem("sessionData"));
		
		
		if (!key) { // NO he metido key por param
			
			return sessionData; // devuelvo todo, podría ser null
			
		} else { // he metido una key específica por param
			
			if (this.isLoggedIn()) { // estoy logeado
				
				let res = sessionData[key]; // pruebo a sacar el value
				// let res = sessionData.token;
				
				if (res) { // si existe, lo devuelvo
					return res;
				} else { // si no existe, devuelvo "" (todos los values son strings)
					return "";
				};
				
			} else {
				return ""; // no estoy logeado, pida lo que pida devuelvo ""
			};
			
		};
		
	};
	
	saveSessionData(sessionData: object): void {
		// userService.saveSessionData({username: "asd", userId: "4h6fsdh43", token: "5j64523hdx2"})
		
		localStorage.setItem ("sessionData", JSON.stringify (sessionData));
	};
	
	deleteSessionData(): void {
		localStorage.removeItem ("sessionData");
	};
	
	
	
	getToken(): string {
		if (this.isLoggedIn()) {
			return this.getSessionData().token;
		} else {
			return "";
		};
	};
	
	
}
