import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';



@NgModule({
  declarations: [
    PosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PosRoutingModule
  ]
})
export class PosModule { }
