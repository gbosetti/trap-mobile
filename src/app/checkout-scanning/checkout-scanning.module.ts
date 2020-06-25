import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutScanningPageRoutingModule } from './checkout-scanning-routing.module';

import { CheckoutScanningPage } from './checkout-scanning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutScanningPageRoutingModule
  ],
  declarations: [CheckoutScanningPage]
})
export class CheckoutScanningPageModule {}
