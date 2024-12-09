import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../storage/storage.service";
import {catchError, retry} from "rxjs";
import {FormGroup} from "@angular/forms";
import {LoginFormValue} from "../../interfaces/login-form-value";
import {ConfigService} from "../config/config.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
  }

  emailPasswordLogin(loginFormValue: LoginFormValue) {
    return this.http.post(this.api_url + '/authentication/', loginFormValue);
  }

  async verifyToken() {
    const headers = await this.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/tokens/', {headers: headers})
  }

  async getAuthorization() {
    if (!this.storageService.isReady()) {
      console.warn('storage is not ready')
      await this.storageService.init()
    }
    let token = await this.storageService.get('token')
    if (!token) {
      console.warn('getAuthorization: token is not found')
      this.router.navigate(['/login']).then()
      throw new Error('token is not found')
    }
    return {
      'Authorization': token
    }
  }

  logout() {
    this.getAuthorization()
      .then((headers) => {
        if (headers.Authorization === null) {
          console.warn('headers.Authorization is null')
          return
        }
        // console.warn('revoke token:', headers)
        this.http.put(this.api_url + '/tokens/', {}, {headers: (headers)})
          .pipe(
            catchError(error => {
              retry(3)
              throw error
            })
          )
          .subscribe((response) => {
            console.info(response)
          })
      })
    this.storageService.remove('token')
    this.router.navigate(['/login']).then()
  }

  /* Login & Register */
  getFormValidationError(control: string, formGroup: FormGroup) {
    const errors = formGroup.get(control)?.errors
    if (!errors) {
      return null
    }
    const errors_array = errors as { [key: string]: any }
    const error = Object.keys(errors_array)[0]

    switch (control) {
      case 'email':
        if (error === 'required') {
          return 'Email is required'
        } else if (error === 'pattern') {
          return 'Email must be a valid SIS email'
        } else {
          return 'Email is invalid'
        }
      case 'password':
        if (error === 'required') {
          return 'Password is required'
        } else {
          return 'Password is invalid'
        }
      default:
        return 'Invalid input'
    }

  }

  isPasswordErrorDisplayed() {
    const errorTexts = document.getElementsByClassName('error-text')
    for (let i = 0; i < errorTexts.length; i++) {
      if (errorTexts[i].parentElement?.parentElement?.id === 'password-ion-input') {
        const display = window.getComputedStyle(errorTexts[i]).display
        if (display === 'block') {
          return true
        }
      }
    }
    return false
  }
}



