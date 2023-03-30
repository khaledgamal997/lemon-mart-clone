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
    },
    a {
      text-decoration:none;
    }
    `
  ],
  template: `
  <div flexLayout>
  <mat-toolbar color ="primary">
    <a mat-button
    routerLink="/manager/home"
    routerLinkActive="active-link"
    style="text-decoration: none;"
    >
      Manager's Dashboard
    </a>
    <a mat-button
    routerLink="/manager/users"
    routerLinkActive="active-link"
    style="text-decoration: none;"
    >
      User Management
    </a>
    <a mat-button
     routerLink="/manager/receipts"
     routerLinkActive="active-link"
     style="text-decoration: none;"
     >
     Receipt Lookup
    </a>
  </mat-toolbar>
  </div>
  <router-outlet></router-outlet>
  `
}
)
export class ManagerComponent {

}
