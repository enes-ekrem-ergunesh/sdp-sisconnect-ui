import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {environment} from "../../../../environments/environment";  // change the path for dev/prod
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl!: string

  constructor(
    public platform: Platform,
    private alertService: AlertService,
    private storageService: StorageService,
    private router: Router,
  ) {
    if (environment.production) {
      this.apiUrl = environment.sisConnectApiUrl
    } else {
      this.onDev()
    }
  }

  getApiUrl() {
    return this.apiUrl
  }

  onDev() {
    if (this.platform.is("android")) {
      this.apiUrl = environment.sisConnectApiExternalUrl
    } else {
      this.apiUrl = environment.sisConnectApiUrl
    }
  }

  public handleError(error: HttpErrorResponse) {
    /**
     * Handle HTTP error
     *
     * @param {HttpErrorResponse}
     * */

    switch (error.status) {

      case 0: // A client-side or network error occurred. Handle it accordingly.
        this.alertService.createAlert(error.status, 'An error occurred:' + error.error)
        break;

      case 401: // Unauthorized error; redirect to login page
        const alertCallBack = () => {
          setTimeout(async () => { // sleep 2 seconds before redirecting to login page
            this.storageService.remove('token');
            this.router.navigate(['login']).then(() => {
            });
            const backdrops = document.getElementsByClassName('modal-backdrop')
            for (let i = 0; i < backdrops.length; i++) {
              backdrops[i].remove()
            }
          }, 2000);
        }
        this.alertService.createAlert(
          error.status,
          "Authorization is missing! Redirecting to login page...",
          alertCallBack
        )
        break;

      case 404:
          this.router.navigate(['404']).then(() => {});
          break;

      default:
        try {
          this.alertService.createAlert(error.status, error.error.message)
        } catch (e) {
          this.alertService.createAlert(error.status, "An error occurred: " + error.error)
        }

    }

    return throwError(() => new Error('Something bad happened!'));
  }

  public handleSuccess(message: string) {
    /**
     * Handle success message
     *
     * @param {string}
     * */
    this.alertService.createAlert(200, message)
  }
}
