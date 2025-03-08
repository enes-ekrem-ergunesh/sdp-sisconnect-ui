import {Component, OnInit, Optional} from '@angular/core';
import {
  IonButton,
  IonButtons, IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonList,
  IonRouterOutlet, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {Platform} from "@ionic/angular";
import {App} from "@capacitor/app";
import {PostService} from "../../../services/post/post.service";
import {BehaviorSubject, catchError} from "rxjs";
import {PostInfo} from "../../../interfaces/post-info";
import {ConfigService} from "../../../services/config/config.service";
import {NgForOf} from "@angular/common";
import {addIcons} from "ionicons";
import {refresh} from "ionicons/icons";
import {RefresherComponent} from "../../refresher/refresher.component";
import {PostComponent} from "../../post/post.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CreatePostFabComponent} from "../../buttons/create-post-fab/create-post-fab.component";
import {LogoComponent} from "../../logo/logo.component";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  imports: [
    IonList,
    IonItem,
    NgForOf,
    RefresherComponent,
    PostComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    RouterLink,
    RouterLinkActive,
    CreatePostFabComponent,
    LogoComponent
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
    addIcons({refresh})

  }

  async ngOnInit() {
    await this.getAllPostsConnected()
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
}
