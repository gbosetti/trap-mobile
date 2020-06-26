import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {StorageService} from '../_services/storage.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner, private storage: StorageService) {
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanCode() {
  	console.log(this.barcodeScanner);
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        //this.scannedData = barcodeData;
        this.storage.setCurrentUserByDNI(33609728); //Example
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  ngOnInit() {
    this.storage.setCurrentUserByDNI(33609728); //Example. Remove after coding the scanCode implementation
  }

}
