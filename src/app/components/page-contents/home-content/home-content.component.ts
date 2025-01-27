import {Component, OnInit, Optional} from '@angular/core';
import {IonButton, IonItem, IonList, IonRouterOutlet} from "@ionic/angular/standalone";
import {Platform} from "@ionic/angular";
import {App} from "@capacitor/app";
import {PostService} from "../../../services/post/post.service";
import {BehaviorSubject, catchError} from "rxjs";
import {PostInfo} from "../../../interfaces/post-info";
import {ConfigService} from "../../../services/config/config.service";
import {NgForOf} from "@angular/common";
import {PostConnectedComponent} from "../../post/post-connected/post-connected.component";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  imports: [
    IonList,
    IonItem,
    NgForOf,
    PostConnectedComponent
  ],
  standalone: true
})
export class HomeContentComponent  implements OnInit {
  postsConnected = new BehaviorSubject<PostInfo[]>([])

  constructor(
    private configService: ConfigService,
    private platform: Platform,
    private postService: PostService,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()){
        App.exitApp().then()
      }
    })

  }

  async ngOnInit() {
    await this.getAllPostsConnected()
    // this.onPostsOfConnectedUpdate()
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
        this.postsConnected.next(_posts)
      })
  }

  onPostsOfConnectedUpdate() {
    this.postsConnected.subscribe((posts) => {
      console.log(posts)
    })
  }

}
