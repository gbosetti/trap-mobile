import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinMeasurementsPageRoutingModule } from './checkin-measurements-routing.module';

import { CheckinMeasurementsPage } from './checkin-measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckinMeasurementsPageRoutingModule
  ],
  declarations: [CheckinMeasurementsPage]
})
export class CheckinMeasurementsPageModule {}
