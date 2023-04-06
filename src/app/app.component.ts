import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <mat-toolbar
        fxLayoutGap="8px"
        color="primary"
        class="app-toolbar"
        [class.app-is-mobile]="media.isActive('xs')"
        *ngIf="{
          status: authService.authStatus$ | async,
          user: authService.currentUser$ | async
        } as auth"
      >
        <button
          *ngIf="auth?.status?.isAuthenticated"
          mat-icon-button
          (click)="sidenav.toggle()"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <a mat-button routerLink="/home">
          <mat-icon svgIcon="lemon"></mat-icon>
          <span class="mat-h2">LemonMart</span>
        </a>
        <span class="flex-spacer"></span>

        <button
          *ngIf="auth?.status?.isAuthenticated"
          mat-icon-button
          matTooltip="Profile"
          aria-label="User Profile"
          routerLink="/user/profile"
        >
          <img
            *ngIf="auth?.user?.picture"
            class="image-cropper"
            [src]="auth?.user?.picture"
          />
          <mat-icon *ngIf="!auth?.user?.picture">account_circle</mat-icon>
        </button>

        <button
          *ngIf="auth?.status?.isAuthenticated"
          mat-icon-button
          matTooltip="Logout"
          aria-label="Logout"
          routerLink="/user/logout"
        >
          <mat-icon *ngIf="auth?.status?.isAuthenticated">lock_open</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="media.isActive('xs') ? 'over' : 'side'"
          [fixedInViewport]="media.isActive('xs')"
          fixedTopGap="56"
          [(opened)]="opened"
        >
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  opened!: boolean;
  constructor(
    iconRigestry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    public media: MediaObserver
  ) {
    iconRigestry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
  }
  ngOnInit(): void {
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$,
    ])
      .pipe(
        tap(([mediaValue, authStatus]) => {
          if (!authStatus?.isAuthenticated) {
            this.opened = false;
          } else {
            if (mediaValue[0].mqAlias === 'xs') {
              this.opened = false;
            } else {
              this.opened = true;
            }
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
