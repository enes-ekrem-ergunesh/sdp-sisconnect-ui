import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileService} from "../../../services/profile/profile.service";
import {ConfigService} from "../../../services/config/config.service";
import {catchError} from "rxjs";
import {NgOptimizedImage} from "@angular/common";
import {IonButton, IonIcon, IonLabel} from "@ionic/angular/standalone";
import {MomentModule} from "ngx-moment";
import {addIcons} from "ionicons";
import {trash} from "ionicons/icons";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-post-owned',
  templateUrl: './post-owned.component.html',
  styleUrls: ['./post-owned.component.scss'],
  imports: [
    NgOptimizedImage,
    IonLabel,
    MomentModule,
    IonButton,
    IonIcon
  ],
  standalone: true
})
export class PostOwnedComponent  implements OnInit {
  @Input() user_id!: number;
  @Input() id!: number;
  @Input() content!: string;
  @Input() created_at!: string;
  @Output() postDeleted = new EventEmitter<void>();
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
    private postService: PostService
  ) {
    addIcons({trash})
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

  async removePost(){
    (await this.postService.removePost(this.id))
      .pipe()
      .subscribe(() => {
        this.postDeleted.emit();
      })
  }


}
