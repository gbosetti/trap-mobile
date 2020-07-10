import {ScanStrategy} from "./scan-strategy";
import { Router } from '@angular/router';

export class CheckOutScanStrategy extends ScanStrategy {

	constructor() {
		super();
	}

    getMeasurementsRoute(){
    	return '/checkout-measurements';
    }
}