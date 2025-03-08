import {Component, Input, OnInit} from '@angular/core';
import {IonItem, IonList} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";
import {PostService} from "../../../../../services/post/post.service";
import {ConfigService} from "../../../../../services/config/config.service";
import {BehaviorSubject, catchError} from "rxjs";
import {PostInfo} from "../../../../../interfaces/post-info";
import {PostComponent} from "../../../../post/post.component";
import {ProfileFieldInfo} from "../../../../../interfaces/profile-field-info";
import {ProfileInfo} from "../../../../../interfaces/profile-info";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  imports: [
    IonItem,
    IonList,
    NgForOf,
    PostComponent
  ],
  standalone: true
})
export class ProfilePostsComponent  implements OnInit {
  @Input() profilePosts!: BehaviorSubject<PostInfo[]>
  @Input() profileId!: BehaviorSubject<number>

  constructor(
    private postService: PostService,
    private configService: ConfigService,
  ) { }

  async ngOnInit() {
    return
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
