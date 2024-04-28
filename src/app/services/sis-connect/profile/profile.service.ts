import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {StorageService} from "../../common/storage/storage.service";
import {BehaviorSubject, catchError, Observable, Subject} from "rxjs";
import {ProfileAboutFields} from "../../../interfaces/profile/profile-about-fields";
import {AlertService} from "../../common/alert/alert.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {ProfileAboutFieldType} from "../../../interfaces/profile/profile-about-field-type";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private newProfileAboutItemBeingAdded = new BehaviorSubject(false)
  private localProfileAboutFields = new BehaviorSubject<ProfileAboutFields[]>([])

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService,
    private alertService: AlertService,
  ) {
  }

  /* API ENDPOINTS */
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

  async getProfileAboutFields(profile_id: number) {
    await this.initLocalProfileAboutFields(profile_id);
    return this.http.get<ProfileAboutFields[]>(
      this.configService.getApiUrl() + '/profile/about/fields/' + profile_id,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  async updateProfileAboutFields(profileAboutFields: ProfileAboutFields[]) {
    return this.http.put<BasicHttpResponse>(
      this.configService.getApiUrl() + '/profile/about/fields/update',
      profileAboutFields,
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    ).subscribe((response) => {
      this.alertService.createAlert(200, response.message)
    });
  }

  async getProfileAboutFieldTypes() {
    return this.http.get<ProfileAboutFieldType[]>(
      this.configService.getApiUrl() + '/profile/about/fields/types',
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  /* LOCAL PROFILE ABOUT FIELDS */
  async initLocalProfileAboutFields(profile_id: number) {
    if (this.localProfileAboutFields.value.length === 0) {
      this.http.get<ProfileAboutFields[]>(
        this.configService.getApiUrl() + '/profile/about/fields/' + profile_id,
        {
          headers: new HttpHeaders({ // add the bearer token to the headers
            Authorization: 'Bearer ' + await this.storageService.get('token')
          })
        }
      ).pipe(
        catchError((error) => this.configService.handleError(error))
      ).subscribe((data) => {
        this.setLocalProfileAboutFields(data)
      });
    }
  }

  getLocalProfileAboutFields() {
    return this.localProfileAboutFields
  }

  setLocalProfileAboutFields(profileAboutFields: ProfileAboutFields[]) {
    this.localProfileAboutFields.next(profileAboutFields)
  }

  appendLocalProfileAboutFields(profileAboutField: ProfileAboutFields) {
    this.localProfileAboutFields.next([...this.localProfileAboutFields.value, profileAboutField])
  }

  removeFromLocalProfileAboutFields(id: number) {
    this.localProfileAboutFields.next(this.localProfileAboutFields.value.filter((field) => field.id !== id))
  }

  /* NEW PROFILE ABOUT ITEM */
  toggleNewProfileAboutItemBeingAdded() {
    this.newProfileAboutItemBeingAdded.next(!this.newProfileAboutItemBeingAdded.value)
  }

  getNewProfileAboutItemBeingAdded() {
    return this.newProfileAboutItemBeingAdded
  }

  resetNewProfileAboutItemBeingAdded() {
    this.newProfileAboutItemBeingAdded.next(false)
  }
}
