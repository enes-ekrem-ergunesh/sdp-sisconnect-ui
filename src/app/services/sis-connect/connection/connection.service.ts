import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Params} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {StorageService} from "../../common/storage/storage.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {Connection} from "../../../interfaces/sis-connect/connection/connection";
import {ConnectionRequest} from "../../../interfaces/sis-connect/connection/connection-request";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

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

  async create_connection() {
    const user_id = this.get_user_id_from_route()

    return this.http.post<BasicHttpResponse>(
      this.configService.getApiUrl() + '/connection',
      {
        "connected_user_id": user_id
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

  async get_connection_between_users() {
    const user_id = this.get_user_id_from_route()

    return this.http.get<Connection>(
      this.configService.getApiUrl() + '/connection/between/' + user_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async get_connection_requests(){
    return this.http.get<ConnectionRequest[]>(
      this.configService.getApiUrl() + '/connection/requests',
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async delete_connection_between_users() {
    const user_id = this.get_user_id_from_route()

    return this.http.delete<BasicHttpResponse>(
      this.configService.getApiUrl() + '/connection/between/' + user_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );


  }

  async delete_connection(connection_id: number) {
    return this.http.delete<BasicHttpResponse>(
      this.configService.getApiUrl() + '/connection/' + connection_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async accept_connection(connection_id: number) {
    return this.http.put<BasicHttpResponse>(
      this.configService.getApiUrl() + '/connection/accept/' + connection_id,
      {},
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
