import { Component, OnInit } from '@angular/core';
import {StorageService} from '../_services/storage.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

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
