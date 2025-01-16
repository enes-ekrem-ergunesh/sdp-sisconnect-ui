import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileSegmentComponent} from "./profile-segment/profile-segment.component";
import {BehaviorSubject, catchError, retry} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  imports: [
    ProfileSegmentComponent,
    NgOptimizedImage
  ],
  standalone: true
})
export class ProfileContentComponent implements OnInit {
  @Input() user_id!: BehaviorSubject<number>;

  profileInfo= new BehaviorSubject<ProfileInfo>({
    id: 0,
    user_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
  })

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
  ) {
  }

  async ngOnInit() {
    this.user_id.subscribe(async (user_id) => {
      console.log("Current User ID: ", user_id);
      if(user_id === 0) {
        return
      }
      (await this.profileService.getProfileInfo(user_id))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Profile Access Error")
            throw error
          })
        )
        .subscribe((data: any) => {
          this.profileInfo.next(data)
        })
    })

  }
}
