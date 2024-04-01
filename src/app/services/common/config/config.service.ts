import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {environment} from "../../../../environments/environment";  // change the path for dev/prod
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl!: string

  constructor(
    public platform: Platform,
    private alertService: AlertService,
    private storage: Storage,
    private router: Router,
  ) {
    if (environment.production) {
      // declare apiUrl for production environment
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
    // console.log('Error occurred with status:', error.error.message);

    switch (error.status) {
      case 0: // A client-side or network error occurred. Handle it accordingly.
        this.alertService.createAlert(error.status, 'An error occurred:' + error.error)
        break;
      case 401: // Unauthorized error; redirect to login page
        this.alertService.createAlert(error.status, "Authorization is missing! Redirecting to login page...")
        // sleep 2 seconds before redirecting to login page
        setTimeout(async () => {
          await this.storage.remove('token');
          this.router.navigate(['login']).then(() => console.log('Redirecting to login page...'));
        }, 2000);
        break;
      default:
        try {
          this.alertService.createAlert(error.status, error.error.message)
        }
        catch (e) {
          this.alertService.createAlert(error.status, "An error occurred: " + error.error)
        }
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened!'));
  }
}
