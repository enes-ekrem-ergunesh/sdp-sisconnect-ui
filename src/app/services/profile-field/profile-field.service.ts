import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileFieldService {
  api_url = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  async getAllProfileField(profile_id: number) {
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/profileFields/profile/' + profile_id, {headers: headers});
  }

}
