import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Token} from "../../../interfaces/sis-connect/user/token";
import {Storage} from '@ionic/storage-angular';
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storage: Storage,
  ) {
  }

  getUserHello() {
    return this.http.get<BasicHttpResponse>(this.configService.getApiUrl() + '/user/hello');
  }

  login(formValue: Partial<{ email: string | null, password: string | null, rememberMe: boolean | null }>) {
    return this.http.post<Token>(this.configService.getApiUrl() + '/user/login', formValue).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async logout() {
    return this.http.post<BasicHttpResponse>(this.configService.getApiUrl() + '/user/logout',
      {
        text: 'logout'
      },
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + await this.storage.get('token'),
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }
}
