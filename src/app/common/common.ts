import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Validators } from '@angular/forms'

export function transformError(error: HttpErrorResponse | string) {

  let errorMessage = 'An unknown error has occurred!'
  if (typeof error === 'string') {
    errorMessage = error
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`
  } else if (error.status) {
    errorMessage = `Request fail with ${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    errorMessage = error.message
  }
  return throwError(() => new Error(errorMessage))
}

export const EmailValidation = [
  Validators.required, Validators.email
]
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
]
