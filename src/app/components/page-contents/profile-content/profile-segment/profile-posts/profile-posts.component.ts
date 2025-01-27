import { Component, OnInit } from '@angular/core';
import {IonButton, IonItem, IonList} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {PostConnectedComponent} from "../../../../post/post-connected/post-connected.component";
import {PostService} from "../../../../../services/post/post.service";
import {ConfigService} from "../../../../../services/config/config.service";
import {BehaviorSubject, catchError} from "rxjs";
import {PostInfo} from "../../../../../interfaces/post-info";
import {PostOwnedComponent} from "../../../../post/post-owned/post-owned.component";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  imports: [
    IonButton,
    IonItem,
    IonList,
    NgForOf,
    PostConnectedComponent,
    PostOwnedComponent,
    NgIf
  ],
  standalone: true
})
export class ProfilePostsComponent  implements OnInit {
  profilePosts = new BehaviorSubject<PostInfo[]>([])

  constructor(
    private postService: PostService,
    private configService: ConfigService,
  ) { }

  async ngOnInit() {
    if (this.isOwnProfile()) await this.getAllPostsOfCurrentUser()
    else await this.getAllPostsConnected()
    return
  }

  isOwnProfile() {
    let urlParam = window.location.href.split('/').slice(-1)[0];
    return urlParam === 'tabs';
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
