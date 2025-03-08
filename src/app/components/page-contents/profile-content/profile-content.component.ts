import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileSegmentComponent} from "./profile-segment/profile-segment.component";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";
import {NgOptimizedImage} from "@angular/common";
import {ProfileFieldService} from "../../../services/profile-field/profile-field.service";
import {ProfileFieldInfo} from "../../../interfaces/profile-field-info";
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";
import {User} from "../../../interfaces/user";
import {PostInfo} from "../../../interfaces/post-info";
import {UserService} from "../../../services/user/user.service";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  imports: [
    ProfileSegmentComponent,
    NgOptimizedImage,
  ],
  standalone: true
})
export class ProfileContentComponent implements OnInit {
  @Input() user!: BehaviorSubject<User>;

  profileInfo = new BehaviorSubject<ProfileInfo>({
    id: 0,
    user_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    is_admin: false
  })

  profileFields = new BehaviorSubject<ProfileFieldInfo[]>([])
  profilePosts = new BehaviorSubject<PostInfo[]>([])

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private profileService: ProfileService,
    private profileFieldService: ProfileFieldService,
    private postService: PostService
  ) {
    addIcons({add})
  }

  async ngOnInit() {
    this.user.subscribe(async (user) => { // Wait for the user_id to be available
      if (!user.id || user.id === 0) {
        return
      }

      const self_user = this.userService.currentUser.value;
      if (self_user.id === user.id) {
        await this.getAllPostsOfCurrentUser();
      } else {
        await this.getAllPostsConnected();
      }

      ;(await this.profileService.getProfileInfo(user.id)) // Get the profile info
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Profile Access Error")
            throw error
          })
        )
        .subscribe(async (data: any) => {
          const _profileInfo = data as ProfileInfo
          this.profileInfo.next(_profileInfo);
          await this.getProfileFields(_profileInfo.id);
        })

    })
  }

  async getProfileFields(profile_id: number|null) {
    (await this.profileFieldService.getAllProfileField(profile_id))
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Profile Field Access Error")
          throw error
        })
      )
      .subscribe(async (data: any) => {
        this.profileFields.next(data as ProfileFieldInfo[])
      })

  }

  async getAllPostsConnected(){
    (await this.postService.getAllPostsOfConnected())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Post Access Error")
          throw error
        })
      )
      .subscribe(posts => {
        const _posts = posts as PostInfo[]
        this.profilePosts.next(_posts)
      })
  }
  async getAllPostsOfCurrentUser(){
    (await this.postService.getAllPostsOfCurrentUser())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Post Access Error")
          throw error
        })
      )
      .subscribe(posts => {
        const _posts = posts as PostInfo[]
        this.profilePosts.next(_posts)
      })
  }

}
