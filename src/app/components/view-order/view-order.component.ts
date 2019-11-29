import { Component, OnInit } from "@angular/core";
import { OrderService } from 'src/app/services/order.service';

@Component({
	selector: "app-view-order",
	templateUrl: "./view-order.component.html",
	styleUrls: ["./view-order.component.scss"]
})
export class ViewOrderComponent implements OnInit {
	
	orders: any = {};
	
	constructor(private orderService: OrderService) {}

	ngOnInit() {
		
		this.orderService.getAllOrders().subscribe(
			
			(res) => {
				console.log( res );
				this.orders = res;
			},
			
			(err) => {
				console.log( err );
			}
			
		);
		
	};
}
