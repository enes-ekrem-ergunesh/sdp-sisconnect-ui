import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {environment} from "../../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {AlertService} from "../alert/alert.service"; // change the path for dev/prod

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl!: string

  constructor(
    public platform: Platform,
    private alertService: AlertService,
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
    this.alertService.createAlert(error.status, "An error occurred!")
    console.log('Error occurred with status:', error.error.message);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
