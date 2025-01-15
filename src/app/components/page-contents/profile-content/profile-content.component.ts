import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileSegmentComponent} from "./profile-segment/profile-segment.component";
import {catchError, retry} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  imports: [
    ProfileSegmentComponent
  ],
  standalone: true
})
export class ProfileContentComponent implements OnInit {
  @Input() user_id!: number;

  profileInfo: ProfileInfo = {
    id: 0,
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  };

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
  ) {
  }

  async ngOnInit() {
    (await this.profileService.getProfileInfo(this.user_id))
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Profile Access Error")
          throw error
        })
      )
      .subscribe((data: any) => {
        this.profileInfo = data
      })
    return
  }
}
