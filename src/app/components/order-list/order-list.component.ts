import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from 'src/app/services/movie.service';



@Component({
	selector: "app-order-list",
	templateUrl: "./order-list.component.html",
	styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
	constructor(private orderService: OrderService, private movieService: MovieService) {}
	
	displayedColumns: string[] = ["status", "id", "title", "city", "startDate", "endDate"];
	// displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	orders: any;
	dataSource: any;
	
	
	
	ngOnInit() {
		
		this.orderService.getAllOrders().subscribe(
			(res: []) => {
				
				this.dataSource = new MatTableDataSource(res);
				this.dataSource.sort = "";
				
				
				// Itero cada movieId para pedir el título
				for (let _x of this.dataSource.filteredData) {
					this.movieService.getMovieById(_x.movieId).subscribe(
						(res: any) => {
							_x.title = res.title;
						},
						(err) => {
							console.log( err );
						}
					);
					
				};
				
			},
			
			(err) => {
				console.log(err);
			}
		);
	};
	
	
	
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	};
	
	
}
