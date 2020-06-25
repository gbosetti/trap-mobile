import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasurementsPage } from './measurements.page';

const routes: Routes = [
  {
    path: '',
    component: MeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurementsPageRoutingModule {}
