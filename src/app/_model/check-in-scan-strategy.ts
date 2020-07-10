import {ScanStrategy} from "./scan-strategy";
import { Router } from '@angular/router';

export class CheckInScanStrategy extends ScanStrategy {

	constructor() {
		super();
	}

    getMeasurementsRoute(){
    	return '/measurements';
    }
}