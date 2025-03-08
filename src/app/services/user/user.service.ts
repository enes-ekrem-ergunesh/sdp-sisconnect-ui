import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject, catchError} from "rxjs";
import {User} from "../../interfaces/user";
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_url = environment.api;

  currentUser = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService
  ) { }

  async init() {
    (await this.getCurrentUser())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "User Info Access Error")
          throw error
        })
      )
      .subscribe((r) => {
        this.currentUser.next(r as User);
      })
  }

  async getCurrentUser() {
    let headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/users/self', {headers: headers});
  }

  async getUserById(user_id: number) {
    let headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/users/' + user_id, {headers: headers});
  }

  async searchUsers(searchQuery: string) {
    let headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/users/' + searchQuery, {headers: headers});
  }
}
