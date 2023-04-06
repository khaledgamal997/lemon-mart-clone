import { Injectable } from "@angular/core";
import decode from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, filter, map, mergeMap, pipe, tap, throwError } from "rxjs";
import { IUser, User } from "../user/user/user";
import { Role } from "./auth.enum";
import { transformError } from "../common/common";
import { CacheService } from "./cache.service";

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}
export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IAuthServerResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: ''
}

@Injectable()
export abstract class AuthService
  extends CacheService implements IAuthService {

  private getAndUpdateUserIfAuhtenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => {
      console.log(user._id);

      this.currentUser$.next(user)
    }),
    catchError(transformError)
  )

  protected abstract authProvider(email: string, password: string): Observable<IAuthServerResponse>
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      // To load user on browser refresh,
      // resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuhtenticated
  )

  login(email: string, password: string): Observable<any> {

    this.clearToken()

    const loginResponse$ =
      this.authProvider(email, password)
        .pipe(
          map((value) => {
            this.setToken(value.accessToken)
            return this.getAuthStatusFromToken()
          }),
          tap((status) => {
            console.log(status);

            this.authStatus$.next(status)
          }),
          this.getAndUpdateUserIfAuhtenticated,
        )

    loginResponse$.subscribe({
      error: (err) => {
        console.log(`${err}`);
        this.logout()
        return throwError( err)
      },
    })
    return loginResponse$
  }


  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }
  protected setToken(jwtToken: string) {
    this.setItem('jwt', jwtToken)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      const payload = decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }
    return true
  }
  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }

}






