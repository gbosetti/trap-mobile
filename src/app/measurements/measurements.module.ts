import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasurementsPageRoutingModule } from './measurements-routing.module';

import { MeasurementsPage } from './measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeasurementsPageRoutingModule
  ],
  declarations: [MeasurementsPage]
})
export class MeasurementsPageModule {}
