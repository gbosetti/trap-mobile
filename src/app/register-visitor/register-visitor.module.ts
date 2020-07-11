import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterVisitorPageRoutingModule } from './register-visitor-routing.module';

import { RegisterVisitorPage } from './register-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterVisitorPageRoutingModule
  ],
  declarations: [RegisterVisitorPage]
})
export class RegisterVisitorPageModule {}
