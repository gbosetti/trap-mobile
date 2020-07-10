import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutMeasurementsPage } from './checkout-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutMeasurementsPageRoutingModule {}
