import {ScanStrategy} from "./scan-strategy";

export class CheckOutScanStrategy extends ScanStrategy {

	constructor() {
		super();
	}

    getMeasurementsRoute(){
    	return '/checkout-measurements';
    }
}