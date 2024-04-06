import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Token} from "../../../interfaces/sis-connect/user/token";
import {catchError} from "rxjs";
import {Router} from "@angular/router";
import {StorageService} from "../../common/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  /**
   * Check if the user is authorized
   *
   * @returns {Promise<boolean>} - true if the user is authorized, false otherwise
   *
   * */
  async isAuthorized(): Promise<boolean> {
    await this.storageService.init();
    const token = await this.storageService.get('token');

    if (token === null || token === undefined) {
      console.log('No token found!')
      return false;
    } else {
      console.log('Token found!')
      return true;
    }
  }

  login(
    formValue: Partial<{ email: string | null; password: string | null; rememberMe: boolean | null; }>
  ) {
    // call the login endpoint
    return this.http.post<Token>(this.configService.getApiUrl() + '/user/login', formValue)
      .pipe( // handle the error
        catchError((error) => this.configService.handleError(error))
      )
      .subscribe( // save the token to the storage and navigate to the home page
        (token: Token) => {
          this.storageService.set('token', token.token);
          this.router.navigate(['home']).then(() => console.log("Navigated to home"));
        }
      )
      ;
  }

  async logout() {
    // call the logout endpoint
    return this.http.post<BasicHttpResponse>(
      this.configService.getApiUrl() + '/user/logout',
      {},
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    )
      .pipe(  // handle the error
        catchError((error) => this.configService.handleError(error))
      )
      .subscribe( // remove the token from the storage and navigate to the login page
        async () => {
          // await this.storage.remove('token');
          this.storageService.remove('token');
          await this.router.navigate(['login']);
        }
      )
      ;
  }
}
