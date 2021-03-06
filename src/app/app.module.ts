import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
	MatInputModule,
	MatIconModule,
	MatButtonModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatCardModule } from "@angular/material/card";
import { HomeComponent } from './components/home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from './components/modal/modal.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		LoginComponent,
		RegisterComponent,
		MovieListComponent,
		HeaderComponent,
		ProfileComponent,
		HomeComponent,
		ModalComponent,
		NewOrderComponent,
		ViewOrderComponent,
		OrderListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,

		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatSelectModule,
		MatTableModule,
		
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
