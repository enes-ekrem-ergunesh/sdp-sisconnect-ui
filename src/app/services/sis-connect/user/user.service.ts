import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Token} from "../../../interfaces/sis-connect/user/token";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Params, Router} from "@angular/router";
import {StorageService} from "../../common/storage/storage.service";
import {User} from "../../../interfaces/sis-connect/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public profilePageRouteParams!: Observable<Params>;

  public userSearchResults = new BehaviorSubject<User[]>([])

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

    return !(token === null || token === undefined);
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
          this.router.navigate(['home']).then(() => {});
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

  async getUser() {
    return this.http.get<User>(
      this.configService.getApiUrl() + '/user',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    )
  }

  async getUserById() {
    let id = 0;
    this.profilePageRouteParams.subscribe((params) => {
      id = <number>params['username'].split('_')[1];
    // console.log("user service > getUserById > id: ", params['username'].split('_')[1])
    });
    return this.http.get<User>(
      this.configService.getApiUrl() + '/user/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    )
  }

  async searchUsers(search: string) {
    if (search.length < 3) {
      this.userSearchResults.next([])
      return
    }
    return this.http.get<User[]>(
      this.configService.getApiUrl() + '/user/search/' + search,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    ).subscribe((users: any) => {
      this.userSearchResults.next(users['users'])
    });
  }

}
