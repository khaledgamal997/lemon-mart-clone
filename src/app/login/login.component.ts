import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, filter, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { AuthService } from '../auth/auth.service';
import { EmailValidation, PasswordValidation } from '../common/common';
import { UiService } from '../common/ui.service';
import { Role } from '../auth/auth.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink();
  redirectUrl!: string;
  loginForm!: FormGroup;
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _uiService: UiService
  ) {
    this.subs.sink = route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    );
  }
  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = `${err}`)))
      .subscribe();

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(
          ([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(([authStatus, user]) => {
          this._uiService.showToast(
            `Welcome ${user.fullName} ! Role ${user.role}`
          );
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ]);
        })
      )
      .subscribe();
  }
  homeRoutePerRole(role: Role): any {
    switch (role) {
      case Role.Cashier:
        return '/pos';
      case Role.Clerk:
        return '/inventory';
      case Role.Manager:
        return '/manager';
      default:
        return '/user/profile';
    }
  }
}
