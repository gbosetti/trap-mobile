import {ScanStrategy} from "./scan-strategy";

export class CheckInScanStrategy extends ScanStrategy {

	constructor() {
		super();
	}

    getMeasurementsRoute(){
    	return '/checkin-measurements';
    }
}