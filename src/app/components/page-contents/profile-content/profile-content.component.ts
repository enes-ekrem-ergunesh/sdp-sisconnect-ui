import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileSegmentComponent} from "./profile-segment/profile-segment.component";
import {BehaviorSubject, catchError, retry} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ProfileFieldService} from "../../../services/profile-field/profile-field.service";
import {ProfileFieldInfo} from "../../../interfaces/profile-field-info";
import {IonButton} from "@ionic/angular/standalone";
import {PlatformService} from "../../../services/platform/platform.service";

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  imports: [
    ProfileSegmentComponent,
    NgOptimizedImage,
    IonButton,
    NgIf
  ],
  standalone: true
})
export class ProfileContentComponent implements OnInit {
  @Input() user_id!: BehaviorSubject<number>;

  profileInfo = new BehaviorSubject<ProfileInfo>({
    id: 0,
    user_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
  })

  profile_fields = new BehaviorSubject<ProfileFieldInfo[]>([])

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
    private profileFieldService: ProfileFieldService,
    private platformService: PlatformService
  ) {
  }

  async ngOnInit() {
    this.user_id.subscribe(async (user_id) => { // Wait for the user_id to be available
      if (user_id === 0) {
        return
      }

      (await this.profileService.getProfileInfo(user_id)) // Get the profile info
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Profile Access Error")
            throw error
          })
        )
        .subscribe(async (data: any) => {
          const _profileInfo = data as ProfileInfo
          this.profileInfo.next(_profileInfo);
          (await this.profileFieldService.getAllProfileField(_profileInfo.id))
            .pipe(
              catchError(async (error) => {
                this.configService.handleError(error, "Profile Field Access Error")
                throw error
              })
            )
            .subscribe(async (data: any) => {
              this.profile_fields.next(data as ProfileFieldInfo[])
            })
        })

    })
  }

  isIonic() {
    return this.platformService.isMobile()
  }


}
