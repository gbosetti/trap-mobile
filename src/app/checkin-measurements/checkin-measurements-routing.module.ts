import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinMeasurementsPage } from './checkin-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: CheckinMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinMeasurementsPageRoutingModule {}
