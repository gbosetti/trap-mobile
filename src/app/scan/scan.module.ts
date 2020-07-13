import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScanPageRoutingModule } from './scan-routing.module';
import { ScanPage } from './scan.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ScanPageRoutingModule
  ],
  providers: [/*ZBar*/ BarcodeScanner],
  declarations: [ScanPage]
})
export class ScanPageModule {}
