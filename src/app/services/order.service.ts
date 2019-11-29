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
		return this.httpClient.post(
			`${this.apiUrl}/order/add?token=${this.token}`,
			{
				"movieId": movieId,
				"userId": this.userId,
				"city": "Valencia",
				"days": days
			}
		);
	};
	
	
	
	getAllOrders(): Observable<object> {
		return this.httpClient.get(
			`${this.apiUrl}/order/client/${this.userId}?token=${this.token}`
		);
	};
	
	
	
	
}
