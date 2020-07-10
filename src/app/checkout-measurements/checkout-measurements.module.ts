import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutMeasurementsPageRoutingModule } from './checkout-measurements-routing.module';

import { CheckoutMeasurementsPage } from './checkout-measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutMeasurementsPageRoutingModule
  ],
  declarations: [CheckoutMeasurementsPage]
})
export class CheckoutMeasurementsPageModule {}
