import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-1">Hello, Limoncu!</span>
      <button mat-raised-button color="primary">Login</button>
    </div>
    <div fxLayout="column" fxLayoutAlign="center center">
      <button mat-raised-button color="primary" routerLink="/manager">
        Login as a manager
      </button>
    </div>
  `,
  styles: [`
    div[fxLayout] {margin-top: 32px;}
  `]
})
export class HomeComponent {

}
