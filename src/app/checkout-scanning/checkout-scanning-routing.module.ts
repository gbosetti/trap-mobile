import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutScanningPage } from './checkout-scanning.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutScanningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutScanningPageRoutingModule {}
