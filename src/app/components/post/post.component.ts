import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileInfo} from "../../interfaces/profile-info";
import {ProfileService} from "../../services/profile/profile.service";
import {ConfigService} from "../../services/config/config.service";
import {PostService} from "../../services/post/post.service";
import {StorageService} from "../../services/storage/storage.service";
import {addIcons} from "ionicons";
import {trash} from "ionicons/icons";
import {catchError} from "rxjs";
import {IonButton, IonIcon, IonLabel} from "@ionic/angular/standalone";
import {MomentModule} from "ngx-moment";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  imports: [
    IonLabel,
    IonButton,
    IonIcon,
    MomentModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class PostComponent  implements OnInit {
  @Input() user_id!: number;
  @Input() id!: number;
  @Input() content!: string;
  @Input() created_at!: string;
  @Output() postDeleted = new EventEmitter<void>();
  current_user_id!: number;
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
    private postService: PostService,
    private storageService: StorageService
  ) {
    addIcons({trash})
  }

  async ngOnInit() {
    await this.getUserInfo()
    this.created_at_tz = new Date(new Date(this.created_at).getTime() + this.current_tz * 60 * 60 * 1000); // adjust tz

    this.storageService.get('user').then((user) => {
      this.current_user_id = user.id
      // console.log(this.current_user_id == this.user_id)
    })
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
