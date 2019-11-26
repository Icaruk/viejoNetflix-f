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
				
				// Formo OBJ con info
				let sessionData = {
					username: res["username"],
					userId: res["userId"],
					token: res["token"]
				};
				
				
				// Lo guardo en local storage
				this.userService.saveSessionData(sessionData);
				
				
				// Redirect
				this.router.navigate(["/"]);
				
				
			},
			
			(error) => {
				
				let errorData = error.error;
				
				
				// Si devuelve token, es que ya tengo un token creado (ya estaba logeado) y me guardo de nuevo la info de la sesión
				if (errorData.token) {
					
					this.userService.saveSessionData({
						username: errorData.username,
						userId: errorData.usarId,
						token: errorData.token
					});
					
				};
				
				
				// Muestro mensaje de error
				this.login_error = errorData.error;
				
				
				// Elimino mensaje de error y redirijo
				setTimeout( () => {
					this.login_error = "";
					// this.router.navigate(["/"]);
				}, 2000);
				
				
			}
			
		);
		
	};
	
}
