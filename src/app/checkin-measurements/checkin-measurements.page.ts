import { Component, OnInit } from '@angular/core';
import {StorageService} from '../_services/storage.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './checkin-measurements.page.html',
  styleUrls: ['./checkin-measurements.page.scss'],
})
export class CheckinMeasurementsPage implements OnInit {

	temperature: number;
	smell: boolean;
	canGoBack: boolean = false;

  constructor(private storage: StorageService) { }

  ngOnInit() {
  	this.loadUserData();
  }

  loadUserData(){
  	console.log(this.storage.getCurrentUser());
  }

}
