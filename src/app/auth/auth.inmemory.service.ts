import { Injectable } from '@angular/core';
import { AuthService, IAuthServerResponse, IAuthStatus } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { PhoneType, User } from '../user/user/user';
import { Role } from './auth.enum';
import { sign } from 'fake-jwt-sign'; //For InMemoryAuthService only

@Injectable()
export class InMemoryAuthService extends AuthService {
  // LemonMart Server User Id: 5da01751da27cc462d265913
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'khalid707.negm@gmail.com',
    name: { first: 'Khaled', last: 'Gamal' },
    picture: '../assets/img/icons/unnamed.jpg',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: '101 Sesame St.',
      city: 'Bethesda',
      state: 'Maryland',
      zip: '20810',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: 5555550717,
      },
    ],
  });

  constructor() {
    super();
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    );
  }

  protected override transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }

  protected override getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }

  protected override authProvider(
    email: string,
    password: string
  ): Observable<IAuthServerResponse> {
    if (email.toLowerCase() !== this.defaultUser.email) {
      console.warn(`invalid email or password`);
      return throwError(
        () => new Error('Failed to login! Email needs to end with @test.com')
      );
    }
    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: this.defaultUser.role,
      //email.includes('cashier')
      //   ? Role.Cashier
      //   : email.includes('clerk')
      //     ? Role.Clerk
      //     : email.includes('manager')
      //       ? Role.Manager
      //       : Role.None,
    } as IAuthStatus;

    this.defaultUser.role = authStatus.userRole;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IAuthServerResponse;
    return of(authResponse);
  }
}
