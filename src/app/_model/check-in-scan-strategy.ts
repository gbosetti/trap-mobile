import {ScanStrategy} from "./scan-strategy";
import { Router } from '@angular/router';

export class CheckInScanStrategy extends ScanStrategy {

	constructor(private router: Router) {
		super();
	}

	loadNextStep(){
		this.router.navigate(['measurements']);
	};
}