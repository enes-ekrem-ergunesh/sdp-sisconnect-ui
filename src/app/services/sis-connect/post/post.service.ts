import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Params} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {StorageService} from "../../common/storage/storage.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Post} from "../../../interfaces/sis-connect/post/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public profilePageRouteParams!: Observable<Params>;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService,
  ) { }

  get_user_id_from_route() {
    let user_id!: number
    this.profilePageRouteParams.subscribe((params) => {
      const username = params['username']
      user_id = Number(username.split('_')[1])
    })
    return user_id
  }

  async create_post(content: string) {

    return this.http.post<BasicHttpResponse>(
      this.configService.getApiUrl() + '/post',
      {
        "content": content
      },
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async get_all_posts_of_connections() {
    return this.http.get<Post[]>(
      this.configService.getApiUrl() + '/post/connections',
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async get_posts_by_user_id() {
    const user_id = this.get_user_id_from_route()

    return this.http.get<Post[]>(
      this.configService.getApiUrl() + '/post/user/' + user_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async soft_delete_post(post_id: number) {
    return this.http.delete<BasicHttpResponse>(
      this.configService.getApiUrl() + '/post/' + post_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

}
