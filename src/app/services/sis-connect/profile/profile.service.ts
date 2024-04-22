import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {StorageService} from "../../common/storage/storage.service";
import {ProfileAbout} from "../../../interfaces/profile/profile-about";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService,
  ) {
  }

  async getProfileAbout(profile_id: number) {
    return this.http.get<ProfileAbout[]>(
      this.configService.getApiUrl() + '/profile/about/' + profile_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async getProfileId() {
    return this.http.get<{ "id": number }>(
      this.configService.getApiUrl() + '/profile',
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
