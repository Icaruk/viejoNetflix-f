import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
	
	register_body: object = {
		username: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		billing: {
			cardNumber: -1,
			cardOwner: "",
			cardExpireDate: [0, 0]
		}
	};
	register_message = "";
	register_error = "";
	
	
	constructor(private userService: UserService, private router: Router) {}
	
	
	register() {
		
		this.userService.register(
			this.register_body
		).subscribe(
			
			(res) => {
				
				// Muestro mensaje
				this.register_message = "Account created. Redirecting to login...";
				
				
				setTimeout( () => {
					this.router.navigate(["/login"]);
					this.register_message = "";
				}, 2000);
				
			},
			
			(error) => {
				
				let errorData = error.error;
				
				
				// Username o email en uso
				if (errorData.errorCode === "user_register_1") {
					
					// Muestro mensaje de error
					this.register_error = errorData.error;
					
					setTimeout( () => {
						this.register_error = "";
					}, 3000);
					
				};
				
				
			}
			
		);
	}
}
