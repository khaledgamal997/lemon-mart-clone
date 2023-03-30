import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'


const models = [MatButtonModule, MatToolbarModule, MatIconModule]

@NgModule({
  declarations: [],
  imports: [models],
  exports: [models]
})
export class MaterialModule { }
