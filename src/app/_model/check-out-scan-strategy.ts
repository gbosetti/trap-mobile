import {ScanStrategy} from "./scan-strategy";
import { Router } from '@angular/router';

export class CheckOutScanStrategy extends ScanStrategy {

	constructor(private router: Router) {
		super();
	}

    getMeasurementsRoute(){
    	return '/checkout-scanning';
    }
}