import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  api_url = environment.api;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  async getAllConnectionsOfCurrentUser() {
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/connections/', {headers: headers});
  }

  async getConnectionById(connection_id:number|null) {
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/connections/' + connection_id, {headers: headers});
  }

  async blockConnection(connected_user_id: number|null){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.put(this.api_url + '/connections/block/', {"connected_user_id": connected_user_id}, {headers: headers});
  }

  async unblockConnection(connected_user_id: number|null){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.put(this.api_url + '/connections/unblock/', {"connected_user_id": connected_user_id}, {headers: headers});
  }

  async getBlockedConnectionsOfCurrentUser(){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.get(this.api_url + '/connections/block/', {headers: headers});
  }

  async createConnection(connected_user_id: number|null){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.post(this.api_url + '/connections/', {"connected_user_id": connected_user_id}, {headers: headers});
  }

  async removeConnection(connected_user_id: number|null){
    const headers = await this.authService.getAuthorization()
    if (headers.Authorization === null) {
      return this.http.get(this.api_url + '/tokens/')
    }
    return this.http.delete(this.api_url + '/connections/' + connected_user_id, {headers: headers});
  }

}
