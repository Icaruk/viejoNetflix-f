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
import { MatInputModule, MatIconModule, MatButtonModule, MatCardModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';



@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		LoginComponent,
		RegisterComponent,
		MovieListComponent,
		HeaderComponent,
		
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
		FormsModule,
		ReactiveFormsModule,

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
