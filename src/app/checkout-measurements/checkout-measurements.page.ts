import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout-measurements',
  templateUrl: './checkout-measurements.page.html',
  styleUrls: ['./checkout-measurements.page.scss'],
})
export class CheckoutMeasurementsPage implements OnInit {

  checkboxes: any;
  visitor: string;

  constructor(private storage: StorageService, private router: Router, public alertController: AlertController) {
    
  }

  loadFacilities(){
    this.storage.getFacilities().then(res=>{
      this.checkboxes = res.data.map(f=>{ return {"value": f.id, "label": f.nombre, "isItemChecked": false}});
    });
  }

  ionViewDidEnter(){
    this.loadFacilities();
    this.storage.getCurrentVisitor().then(res=>{
      this.visitor = res.data.apellido.toUpperCase() + ", " + res.data.nombre + " (" + res.data.dni + ")"
      
      this.storage.checkUserAlreadyEntered(res.data.dni).then(res=>{}).catch(msg=>{
        alert(msg);
        this.router.navigate(["/checkin-measurements"]);
      });

    }).catch(err=>{console.log(err)});
  }

  ngOnInit() {
  }

  async createFacilities(){
     const ionPrompt = await this.alertController.create({
      header: 'Nueva unidad',
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Ej. Departamento de Ciencias...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'light',
          handler: () => {}
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            this.storage.createFacilities(alertData.name).then(res=>{
              this.loadFacilities();
            }).catch(err=>{
              alert(err);
            });
            ;
          }
        }
      ]
    });

    await ionPrompt.present();
  }

  onSubmit(){
  	var selectedFacilities = this.checkboxes.filter(f=>{return f.isItemChecked}).map(f=>{ return f.value});
  	if(selectedFacilities.length<=0){
  		alert("Debe seleccionar al menos una de las instalaciones");
  	}
  	else {
  		this.storage.checkoutCurrentVisitor(selectedFacilities).then(data=>{
  			alert(data.message);
  			this.router.navigate(["/scan"]);
  		}).catch(err=>{
  			alert(err);
  		});
  	}
  }
}
