import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
	providedIn: "root"
})
export class UserService {
	
	// Declaro los valores por defecto
	private sessionData: object = {
		username: "",
		userId: "",
		token: ""
	};
	
	
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
	
	getSessionData(): object {
		return this.sessionData;
	};
	
	setSessionData(sessionData: object): void {
		// userService.setSessionData({username: "asd", userId: "4h6fsdh43", token: "5j64523hdx2"})
		
		this.sessionData = sessionData;
	};
	
}
