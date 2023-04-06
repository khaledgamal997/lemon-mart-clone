import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  styles: [
    `div[fxLayout] {
      margin-top:32px;
    }`,
    `
    .active-link{
      font-weight:bold;
      border-bottom: 2px  solid #005005;
    }
    `,
    `a {
      text-decoration:none;
    }`
  ],
  template: `
  <div flexLayout>

    <mat-toolbar fxLayoutGap="8px" color="primary">
      <a mat-button routerLink="/inventory/home" routerLinkActive="active-link">
        Inventory Dashboard
      </a>
      <a mat-button routerLink="/inventory/stock-entries" routerLinkActive="active-link">
        Stock Entry
      </a>
      <a mat-button routerLink="/inventory/products" routerLinkActive="active-link">
        Products
      </a>
      <a mat-button routerLink="/inventory/categories"routerLinkActive="active-link">
        Categories
      </a>
    </mat-toolbar>

  </div>
  <router-outlet></router-outlet>
  `
})
export class InventoryComponent { }
