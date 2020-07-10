import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {StorageService} from '../_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as $ from 'jquery';
//declare var bootbox: any;

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private barcodeScanner: BarcodeScanner, private storage: StorageService, private formBuilder: FormBuilder, private router: Router) {
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanCode() {
  	console.log(this.barcodeScanner);
    /*this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        //this.scannedData = barcodeData;
        this.storage.setCurrentUserByDNI(33609728); //Example
      })
      .catch(err => {
        console.log("Error", err);
      });*/
  }

  ngOnInit() {
    //this.storage.setCurrentUserByDNI(33609728); //Example. Remove after coding the scanCode implementation

        this.form = this.formBuilder.group({
            dni: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          alert("Por favor, escanee o ingrese por teclado un DNI o pasaporte");
          return;
      }

      this.loading = true;
      this.storage.getUserByDNI(this.f.dni.value).then((res:any) => {
        
        if(res.data.dni == this.f.dni.value){
          this.storage.setCurrentUserByDNI(res.data.dni).then(userData => {
            console.log("Routnggggg", this.storage.getMeasurementsRoute());
            this.router.navigate([this.storage.getMeasurementsRoute()]);
          }, errorMessage => {
              alert(errorMessage);
              this.loading = false;
          });
        }
        else{
          alert("El visitante no ha sido registrado bajo este DNI/pasaporte");
          this.router.navigate(['/register-visitor']);
        }

      }, errorMessage => {
          alert(errorMessage);
          this.loading = false;
      });
  }

}
