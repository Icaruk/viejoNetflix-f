import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class NexusService {
	
	constructor() {}
	
	
	setData (name: string, data: any): void {
		localStorage.setItem(name, data);
	};
	
	getData (name: string) {
		return localStorage.getItem(name);
	};
	
	getDataAndDelete (name: string) {
		
		let res = localStorage.getItem(name);
		localStorage.removeItem(name);
		
		return res;
	};
	
}
