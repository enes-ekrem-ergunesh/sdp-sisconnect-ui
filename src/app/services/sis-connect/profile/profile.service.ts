import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../common/config/config.service";
import {StorageService} from "../../common/storage/storage.service";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {ProfileAboutFields} from "../../../interfaces/profile/profile-about-fields";
import {AlertService} from "../../common/alert/alert.service";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {ProfileAboutFieldType} from "../../../interfaces/profile/profile-about-field-type";
import {User} from "../../../interfaces/sis-connect/user/user";
import {Params} from "@angular/router";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profilePageRouteParams!: Observable<Params>;

  private infoProfileAboutFields = new BehaviorSubject<ProfileAboutFields[]>([])
  private editProfileAboutFields = new BehaviorSubject<ProfileAboutFields[]>([])

  private newProfileAboutItemBeingAdded = new BehaviorSubject(false)
  private profileAboutFieldTypes = new BehaviorSubject<ProfileAboutFieldType[]>([])

  private tempNewProfileAboutItemId = 0

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService,
    private alertService: AlertService,
    private userService: UserService,
  ) {
  }

  /* API ENDPOINTS */
  async getProfileId() {
    let username = ''
    this.profilePageRouteParams.subscribe((params) => {
      // console.log('profile service get profile id: ', params['username'])
      username = params['username']
    })
    return this.http.get<{ "id": number }>(
      this.configService.getApiUrl() + '/profile/' + username,
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
    // reformat dates for mysql datetime
    for (let i = 0; i < profileAboutFields.length; i++) {
      if (profileAboutFields[i].deleted_at) {
        profileAboutFields[i].deleted_at = new Date(profileAboutFields[i].deleted_at || "1970-01-01").toISOString().slice(0, 19).replace('T', ' ')
      }
    }
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

  async getProfileAboutFieldTypes(profile_id: number) {
    return this.http.get<ProfileAboutFieldType[]>(
      this.configService.getApiUrl() + '/profile/about/fields/types/empty/' + (profile_id),
      {
        headers: new HttpHeaders({ // add the bearer token to the headers
          Authorization: 'Bearer ' + await this.storageService.get('token')
        })
      }
    ).pipe(
      catchError((error) => this.configService.handleError(error))
    );
  }

  /* PROFILE ABOUT FIELDS */
  async initProfileAboutFields() {
    (await this.getProfileId()).subscribe(async (profile) => {
      if (this.editProfileAboutFields.value.length === 0) {
        (await this.getProfileAboutFields(profile.id)).subscribe((data) => {
          this.setInfoProfileAboutFields(JSON.parse(JSON.stringify(data)))
          this.setEditProfileAboutFields(data)
        })
      }
    })
  }

  onProfileAboutModalClose() {
    setTimeout(() => {
      this.infoProfileAboutFields.subscribe((data) => {
        this.editProfileAboutFields.next(JSON.parse(JSON.stringify(data)))
      })
      this.resetNewProfileAboutItemBeingAdded()
      this.initProfileAboutFieldTypes().then(() => {
      })
    }, 200)
  }

  /* PROFILE ABOUT FIELD TYPES */
  async initProfileAboutFieldTypes() {
    (await this.getProfileId()).subscribe(async (profile) => {
      (await this.getProfileAboutFieldTypes(profile.id)).subscribe((data) => {
        this.profileAboutFieldTypes.next(data)
      })
    })
  }

  getServiceProfileAboutFieldTypes() {
    return this.profileAboutFieldTypes
  }

  setServiceProfileAboutFieldTypeEmpty(id: number, empty: boolean) {
    const index = this.profileAboutFieldTypes.value.findIndex((field) => field.id === id)
    this.profileAboutFieldTypes.value[index].empty = empty
  }

  /* INFO PROFILE ABOUT FIELDS */
  getInfoProfileAboutFields() {
    return this.infoProfileAboutFields
  }

  setInfoProfileAboutFields(profileAboutFields: ProfileAboutFields[]) {
    this.infoProfileAboutFields.next(profileAboutFields)
  }

  fetchInfoProfileAboutFields() {
    this.infoProfileAboutFields.next(this.editProfileAboutFields.value)
  }

  /* EDIT PROFILE ABOUT FIELDS */
  getEditProfileAboutFields() {
    return this.editProfileAboutFields
  }

  setEditProfileAboutFields(profileAboutFields: ProfileAboutFields[]) {
    this.editProfileAboutFields.next(profileAboutFields)
  }

  async appendEditProfileAboutFields(profileAboutField: ProfileAboutFields) {
    (await this.getProfileId()).subscribe((data) => {
      profileAboutField.profile_id = data.id
    })
    this.editProfileAboutFields.next([...this.editProfileAboutFields.value, profileAboutField])
  }

  removeFromEditProfileAboutFields(id: number) {
    const index = this.editProfileAboutFields.value.findIndex((field) => field.id === id)
    this.editProfileAboutFields.value[index].deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    this.profileAboutFieldTypes.value.filter((field: { id: number; }) =>
      field.id === this.editProfileAboutFields.value[index].profile_field_type_id)[0].empty = true
    this.profileAboutFieldTypes.next(this.profileAboutFieldTypes.value)
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

  getTempNewProfileAboutItemId() {
    this.tempNewProfileAboutItemId--
    return this.tempNewProfileAboutItemId
  }

  /* PROFILE PAGE */
  prepareProfileRoute(user: User) {
    if (user && user.first_name && user.family_name && user.id) {
      const firstNames = user.first_name.split(' ');
      const familyNames = user.family_name.split(' ');
      let username = '';
      firstNames.forEach((name) => {
        username = username.concat(name.toLowerCase());
      })
      familyNames.forEach((name) => {
        username = username.concat(name.toLowerCase());
      })
      username = username + '_' + user.id;
      return username;
    } else {
      return 'User is not ready';
    }
  }

  isProfileOwned(){
    let isProfileOwned = new BehaviorSubject(false)
    this.profilePageRouteParams.subscribe(async (params) => {
      (await this.userService.getUser()).subscribe((user) => {
        // console.log('isProfileOwned', params['username'].split('_')[1], user.id.toString())
        if (params['username'].split('_')[1] === user.id.toString()){
          isProfileOwned.next(true)
        }
      })
    })
    return isProfileOwned
  }

  resetProfilePage() {
    this.editProfileAboutFields.next([])
    this.infoProfileAboutFields.next([])
    this.profileAboutFieldTypes.next([])
    this.newProfileAboutItemBeingAdded.next(false)
    this.tempNewProfileAboutItemId = 0
  }

}
