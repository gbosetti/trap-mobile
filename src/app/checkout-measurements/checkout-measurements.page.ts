import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-checkout-measurements',
  templateUrl: './checkout-measurements.page.html',
  styleUrls: ['./checkout-measurements.page.scss'],
})
export class CheckoutMeasurementsPage implements OnInit {

  checkboxes: any;

  constructor(private storage: StorageService, private router: Router) {

  	this.storage.getFacilities().then(facilities=>{
  		this.checkboxes = facilities.map(f=>{ return {"value": f.id, "label": f.nombre, "isItemChecked": false}});
  	});
  }

  ngOnInit() {
  }

  onSubmit(){
  	var selectedFacilities = this.checkboxes.filter(f=>{return f.isItemChecked}).map(f=>{ return f.value});
  	if(selectedFacilities.length<=0){
  		alert("Debe seleccionar al menos una delas instalaciones");
  	}
  	else {
  		this.storage.checkoutCurrentUser(selectedFacilities).then(data=>{
  			alert(data.message);
  			this.router.navigate(["/scan"]);
  		}).catch(err=>{
  			alert(err);
  		});
  	}
  }

}
