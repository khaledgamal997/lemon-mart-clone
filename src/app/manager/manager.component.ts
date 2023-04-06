import { Component } from '@angular/core';

@Component({
  selector: 'app-manager',
  styles: [
    `div[fxLayout] {
      margin-top:32px;
    }`,
    `
    .active-link{
      font-weight:bold;
      border-bottom: 2px  solid #005005;
    }`,
    `
    a {
      text-decoration:none;
    }
    `
  ],
  template: `
  <div flexLayout>
  <mat-toolbar fxLayoutGap="8px" color ="primary">
    <a mat-button
    routerLink="/manager/home"
    routerLinkActive="active-link"
    >
      Manager's Dashboard
    </a>
    <a mat-button
    routerLink="/manager/users"
    routerLinkActive="active-link"
    >
      User Management
    </a>
    <a mat-button
     routerLink="/manager/receipts"
     routerLinkActive="active-link"
     >
     Receipt Lookup
    </a>
    <span class="flex-spacer"></span>
    <button
      mat-icon-button routerLink="/inventory"
      matTooltip="Inventory" aria-label="Inventory"
      >
      <mat-icon>list</mat-icon>
    </button>
    <button
      mat-icon-button routerLink="/pos"
      matTooltip="POS" aria-label="POS"
      >
      <mat-icon>shopping_cart</mat-icon>
    </button>
  </mat-toolbar>
  </div>
  <router-outlet></router-outlet>
  `
}
)
export class ManagerComponent {

}
