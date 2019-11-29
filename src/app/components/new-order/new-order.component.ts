import { Component, OnInit } from "@angular/core";
import { NexusService } from "src/app/services/nexus.service";
import { OrderService } from "src/app/services/order.service";
import { Router } from '@angular/router';

@Component({
	selector: "app-new-order",
	templateUrl: "./new-order.component.html",
	styleUrls: ["./new-order.component.scss"]
})
export class NewOrderComponent implements OnInit {
	
	// newOrderData: any = {};
	
	newOrderData: any = {
		title: "Nombre de peli"
	};
	
	nDias: number = 1;
	precio: number = 5;
	newOrder_error: string = "";
	newOrder_success: string = "";
	
	
	constructor(
		private nexusService: NexusService,
		private orderService: OrderService,
		private router: Router
	) {}
	
	ngOnInit() {
		this.newOrderData = this.nexusService.getData("newOrderData");
	}
	
	pulsaConfirmaPedido() {
		
		if (!this.newOrderData.id) {
			this.newOrder_error = "ERROR: No movie data.";
			
			setTimeout(() => {
				this.newOrder_error = "";
			}, 2000)
			
			return;
		};
		
		if (this.nDias <= 0) {
			this.newOrder_error = "Invalid number of days.";
			
			setTimeout(() => {
				this.newOrder_error = "";
			}, 3000)
			
			return;
		};
		
		if (this.nDias > 7) {
			this.newOrder_error = "You can't rent for more than 7 days.";
			
			setTimeout(() => {
				this.newOrder_error = "";
			}, 3000)
			
			return;
		};
		
		
		
		// Hago el pedido y espero respuesta
		this.orderService.addOrder(this.newOrderData.id, this.nDias).subscribe(
			(res) => {
				
				this.newOrder_success = "You order has been completed. Redirecting to your orders...";
				
				setTimeout(() => {
					this.newOrder_error = "";
					this.router.navigate(["/orders/view"]);
				}, 3000);
				
			},
			(err) => {
				
				// console.log( err );
				
				if (err.error.errorCode === "order_add_1") {
					
					this.newOrder_error = "You can't rent more than 1 item at the same time. Redirecting to your orders...";
					
					setTimeout(() => {
						this.newOrder_error = "";
						this.router.navigate(["/orders/view"]);
					}, 3000);					
					
				};
			}
		);
		
	}
	
	
}
