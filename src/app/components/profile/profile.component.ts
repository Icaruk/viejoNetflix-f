import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	
	userData: any;
	
	constructor(private userService: UserService) {}
	
	
	ngOnInit() {
		
		this.userService.getProfile().subscribe(
			
			(res) => { // guardo los resultados para poder acceder desde el HTML
				console.log("profile component: ", res );
				this.userData = res;
			},	
			
			(err) => {
				console.log("ERR profile component", err)
			}
			
		);
		
		
	};
}
