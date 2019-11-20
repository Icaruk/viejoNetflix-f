import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";


@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})


export class LoginComponent {
	
	login_body: object = {
		username: "",
		password: ""
	};
	login_error: string = "";
	
	
	constructor(private userService: UserService, private router: Router) {};
	
	
	login() {
		
		this.userService.login(
			this.login_body
		).subscribe(
			
			(res) => {
				
				console.log( res );
				
				this.userService.setSessionData({
					username: res["username"],
					userid: res["userId"],
					token: res["token"]
				});
				
				console.log(this.userService.getSessionData() );
				
			},
			
			(error) => {
				
				console.log( error.error );
				this.login_error = error.error.error;
				
			}
			
		);
		
	};
	
}
