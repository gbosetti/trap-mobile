import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckoutMeasurementsPageRoutingModule } from './checkout-measurements-routing.module';
import { CheckoutMeasurementsPage } from './checkout-measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CheckoutMeasurementsPageRoutingModule
  ],
  declarations: [CheckoutMeasurementsPage]
})
export class CheckoutMeasurementsPageModule {}
