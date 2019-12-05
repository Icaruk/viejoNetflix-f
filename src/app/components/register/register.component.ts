import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";


@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
	
	register_body: any = {
		username: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		
		// billing {
		cardNumber: "",
		cardOwner: "",
		cardExpireDate: []
		// }
		
	};
	register_message = "";
	register_error = "";
	
	errorLoop = 0;
	errorInterval;
	
	
	constructor(private userService: UserService, private router: Router) {}
	
	
	error (message: string, timeout: number = 3) {
		
		// Pongo el mensaje
		this.register_error = message;
		
		
		// Ya estoy en loop
		if (this.errorLoop > 0) {
			this.errorLoop = timeout; // Refresco el tiempo
			return; // y salgo
		};
		
		
		this.errorLoop = timeout; // Entro por primera vez, pongo tiempo
		
		
		// Loop
		this.errorInterval = setInterval( ()=> {
			
			if (this.errorLoop <= 0) {			
				this.register_error = "";
				clearInterval(this.errorInterval); // salgo del loop
			};
			
			this.errorLoop --;
			
		}, 1000);
		
	};
	
	
	register() {
		
		if (this.register_body.username === "") {
			this.error("Username can't be empty.");
			return;
		};
		if (this.register_body.email === "") {
			this.error("Email can't be empty.");
			return;
		};
		if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.register_body.email) ) {
			this.error("Email must be valid.");
			return;
		};
		
		
		if (this.register_body.password === "") {
			this.error("Password can't be empty.");
			return;
		};
		if (this.register_body.password !== this.register_body.password2) {
			this.error("Passwords must match.");
			return;
		};
		if (this.register_body.password.length < 4) {
			this.error("Passwords must have at least 4 characters.");
			return;
		};
		
		
		if (this.register_body.phone === "") {
			this.error("Phone can't be empty.");
			return;
		};	
		if (! /[\d()+-]/g.test(this.register_body.phone) ) {
			this.error("Phone number have valid characters.");
			return;
		};
		if (this.register_body.address === "") {
			this.error("Address can't be empty.");
			return;
		};	
		
		
		if (this.register_body.cardNumber === "") {
			this.error("Card number can't be empty.");
			return;
		};
		if (! /[0-9]/g.test(this.register_body.cardNumber) ) {
			this.error("Card number must be a number.");
			return;
		};
		
		
		if (this.register_body.cardOwner == "") {
			this.error("Card owner can't be empty.");
			return;
		};
		if (! /[a-z]/gi.test(this.register_body.cardOwner) ) {
			this.error("Card owner must have valid characters.");
			return;
		};
		
		
		if (!this.register_body.cardExpireMonth) {
			this.error("Card expire month can't be empty.");
			return;
		};
		if (!this.register_body.cardExpireYear) {
			this.error("Card expire year can't be empty.");
			return;
		};
		if (this.register_body.cardExpireMonth.length !== 2) {
			this.error("Card expire month must have 2 characters.");
			return;
		};
		if (this.register_body.cardExpireYear.length !== 2) {
			this.error("Card expire year must have 2 characters.");
			return;
		};
		if (! /[0-9]/g.test(this.register_body.cardExpireMonth) ) {
			this.error("Card expire month must be a valid month.");
			return;
		};
		if (! /[0-9]/g.test(this.register_body.cardExpireYear) ) {
			this.error("Card expire year must be a valid year.");
			return;
		};
		
		
		
		// Creo el body a enviar
		let body = {
			username: 	this.register_body.username,
			email: 		this.register_body.email,
			password: 	this.register_body.password,
			phone: 		this.register_body.phone,
			address: 	this.register_body.address,
			billing: {
				cardNumber: 	this.register_body.cardNumber,
				cardOwner: 		this.register_body.cardOwner,
				cardExpireDate: [
					this.register_body.cardExpireMonth,
					this.register_body.cardExpireYear
				],
			}
		};
		
		
		
		// Envío
		this.userService.register(
			body
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
