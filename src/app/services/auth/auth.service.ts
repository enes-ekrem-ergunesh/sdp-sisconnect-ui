import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../storage/storage.service";
import {catchError, retry} from "rxjs";
import {FormGroup} from "@angular/forms";
import {LoginFormValue} from "../../interfaces/login-form-value";
import {GoogleLoginPostValue} from "../../interfaces/google-login-post-value";
import {SocialLogin} from "@capgo/capacitor-social-login";


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

  googleLogin(token: GoogleLoginPostValue){
    return this.http.post(this.api_url + '/authentication/google', token);
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
      await this.storageService.init()
    }
    let token = await this.storageService.get('token')
    if (!token) {
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
          return
        }
        this.http.put(this.api_url + '/tokens/', {}, {headers: (headers)})
          .pipe(
            catchError(error => {
              retry(3)
              throw error
            })
          )
          .subscribe(async (response) => {
            console.info(response)
            try {
              await SocialLogin.initialize({
                google: {
                  webClientId: '79123379615-32p4ij8740n13t2bu00nbn7jpcg86101.apps.googleusercontent.com', // the web client id for Android and Web
                },
              });
              await SocialLogin.logout({provider: 'google'})
              console.info('SocialLogin Google logout success by logout()')
            } catch (e) {
              console.error(e)
            }
          })
      })
    this.storageService.remove('token')
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
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



