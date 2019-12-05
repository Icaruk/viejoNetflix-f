import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from './user.service';


@Injectable({
	providedIn: "root"
})
export class OrderService {
	
	apiUrl: string = "http://localhost:3000";
	token: string = this.userService.getSessionData("token");
	userId: string = this.userService.getSessionData("userId");
	
	
	
	constructor(private httpClient: HttpClient, private userService: UserService) {}
	
	
	addOrder(movieId: number, days: number = 3): Observable<object> {
		
		let token = this.userService.getSessionData("token");
		let userId = this.userService.getSessionData("userId");
		
		console.log("Info add order: ", token, userId );
		
		
		return this.httpClient.post(
			`${this.apiUrl}/order/add?token=${token}`,
			{
				"movieId": movieId,
				"userId": this.userId,
				"city": "Valencia",
				"days": days
			}
		);
	};
	
	
	
	getAllOrders(): Observable<object> {
		
		let userId = this.userService.getSessionData("userId");
		let token = this.userService.getSessionData("token");
		
		return this.httpClient.get(
			`${this.apiUrl}/order/client/${userId}?token=${token}`
		);
	};
	
	
	
	
}
