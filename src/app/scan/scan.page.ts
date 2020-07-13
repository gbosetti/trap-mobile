import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import {StorageService} from '../_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
//declare var bootbox: any;
//import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';


@Component({
	selector: 'app-scan',
	templateUrl: './scan.page.html',
	styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

	barcodeScannerOptions: BarcodeScannerOptions;
	form: FormGroup;
	loading = false;
	submitted = false;

	constructor(/*private zbar: ZBar,*/ private barcodeScanner: BarcodeScanner, private storage: StorageService, private formBuilder: FormBuilder, private router: Router) {
		//Options
		this.barcodeScannerOptions = {
			showTorchButton: true,
			showFlipCameraButton: true,
			formats: 'PDF_417'
		};
	}

	scanCode() {
		this.barcodeScanner
			.scan(this.barcodeScannerOptions)
			.then(barcodeData => {
				if(barcodeData.text && barcodeData.format=='PDF_417'){
					var dni = barcodeData.text.split("@")[4];
					this.form.controls.dni.setValue(dni);
					this.storage.setCurrentVisitorByDNI(dni);
				}
			})
			.catch(err => { console.log("Error", err);
		});
		/*let options: ZBarOptions = {
		      flash: 'off',
		      drawSight: false
		    }

		this.zbar.scan(options)
		   .then(result => {
		      console.log(result); // Scanned code
		   })
		   .catch(error => {
		      console.log(error); // Error message
		   });*/
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			dni: ['', Validators.required]
		});
	}

	ionViewDidEnter(){
		this.resetForm();
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
			
			if(res.data==undefined){
				alert("El visitante no está registrado bajo este DNI/pasaporte. Por favor, primero regístrelo.");
				this.router.navigate(['/register-visitor']);
				return;
			}

			if(res.data.dni == this.f.dni.value){
				this.storage.setCurrentVisitorByDNI(res.data.dni).then(userData => {
					this.resetForm();
					this.router.navigate([this.storage.getMeasurementsRoute()]);
				}, errorMessage => {
					alert(errorMessage);
					this.loading = false;
				});
			}

		}, errorMessage => {
			alert(errorMessage);
			this.loading = false;
		});
	}

	resetForm(){
		this.form.reset();
		Object.keys(this.form.controls).forEach(key => {
			this.form.get(key).setErrors(null) ;
		});
	}
}
