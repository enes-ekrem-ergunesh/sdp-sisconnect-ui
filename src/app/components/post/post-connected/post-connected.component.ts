import {Component, Input, OnInit} from '@angular/core';
import {IonAvatar, IonLabel} from "@ionic/angular/standalone";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileService} from "../../../services/profile/profile.service";
import {catchError} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MomentModule} from "ngx-moment";


@Component({
  selector: 'app-post-connected',
  templateUrl: './post-connected.component.html',
  styleUrls: ['./post-connected.component.scss'],
  imports: [
    IonLabel,
    NgOptimizedImage,
    MomentModule
  ],
  standalone: true
})
export class PostConnectedComponent implements OnInit {
  @Input() user_id!: number;
  @Input() id!: number;
  @Input() content!: string;
  @Input() created_at!: string;
  created_at_tz!: Date
  current_tz = 1
  userInfo: ProfileInfo = {
    id: null,
    user_id: null,
    email: null,
    first_name: null,
    last_name: null,
    is_admin: null
  }

  constructor(
    private profileService: ProfileService,
    private configService: ConfigService,
  ) {
  }

  async ngOnInit() {
    await this.getUserInfo()
    this.created_at_tz = new Date(new Date(this.created_at).getTime() + this.current_tz * 60 * 60 * 1000); // adjust tz
    return
  }

  async getUserInfo(){
    (await this.profileService.getProfileInfo(this.user_id))
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Post Access Error")
          throw error
        })
      )
      .subscribe((profileInfo) => {
        this.userInfo = profileInfo as ProfileInfo
      })
  }

}
