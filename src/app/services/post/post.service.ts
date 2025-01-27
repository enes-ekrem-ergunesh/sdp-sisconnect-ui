import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api_url = environment.api;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  async getAllPostsOfCurrentUser() {
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/posts/', {headers: headers});
  }

  async createPost(content: string|null){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.post(this.api_url + '/posts/', {"content": content}, {headers: headers});
  }

  async removePost(postId: number){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.delete(this.api_url + '/posts/' + postId, {headers: headers});
  }

  async getAllPostsOfConnected() {
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/posts/connected', {headers: headers});
  }

}
