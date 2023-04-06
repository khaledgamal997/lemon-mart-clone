import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UiService } from '../common/ui.service';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';
import { Role } from './auth.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {}

  canMatch: CanMatchFn = (route: Route) => {
    return this.checkLogin();
  };

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return this.checkLogin(route);
  };

  canActivateChild: CanActivateChildFn = (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return this.checkLogin(childRoute);
  };

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(authStatus.userRole, route);
        const allowLogin = authStatus.isAuthenticated && roleMatch;

        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch);
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          });
        }
        return allowLogin;
      }),
      take(1) // the observable must complete for the guard to work
    );
  }

  private checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot) {
    if (!route?.data?.['expectedRole']) {
      return true;
    }
    return role === route.data['expectedRole'];
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast(
        'You do not have the permissions to view this resource'
      );
    }
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return '';
    }

    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/');
  }
}
