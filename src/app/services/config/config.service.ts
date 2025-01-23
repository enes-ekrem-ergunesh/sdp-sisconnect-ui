import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public isAlertOpen = new BehaviorSubject(false);
  public alertHeader = new BehaviorSubject('');
  public alertMessage = new BehaviorSubject('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  handleError(error: any, header: string = 'Unknown Error') {
    if (error.status === 401) {
      let redirect_message = ', you will be redirected to login page.';
      header = 'Authentication Error';
      if(this.router.url === '/login-web' || this.router.url === '/login-mobile')
        redirect_message = '';
      this.globalAlert(header, (error?.error?.message || 'Unknown Error. Please try again later.') + redirect_message);
      setTimeout(() => {
        this.isAlertOpen.next(false);
        this.authService.logout()
      }, 2000);
    }
    else if(header === 'Profile Page Error') {
      this.globalAlert(header, error?.error?.message || 'Unexpected URL Parameter. Navigating to home page.');
      setTimeout(() => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        })
      }, 2000);
    }
    else {
      this.globalAlert(header, error?.error?.message || 'Unknown Error. Please try again later.');
    }
  }

  globalAlert(header: string, message: string) {
    this.alertHeader.next(header);
    this.alertMessage.next(message);
    this.isAlertOpen.next(true);
  }


}
