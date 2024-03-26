import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../config/config.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Token} from "../../../interfaces/sis-connect/user/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getUserHello() {
    return this.http.get<BasicHttpResponse>(this.configService.getApiUrl() + '/user/hello');
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<Token>(this.configService.getApiUrl() + '/user/login', {email, password, rememberMe});
  }
}
