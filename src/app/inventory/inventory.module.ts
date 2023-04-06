import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { CategoryComponent } from './category/category.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ProductsComponent } from './products/products.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryHomeComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InventoryRoutingModule,
    FlexLayoutModule,
  ]
})
export class InventoryModule { }
