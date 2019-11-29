import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class NexusService {
	
	nexusData = {};
	
	constructor() {}
	
	
	setData (name: string, data: any): void {
		this.nexusData[name] = data;
	};
	
	getData (name: string): any {
		return this.nexusData[name];
	};
	
	getDataAndDelete (name: string) {
		
		let ret = this.nexusData[name];
		delete this.nexusData[name];
		
		return ret;
	};
	
}
