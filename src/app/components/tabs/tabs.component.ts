import {Component, OnInit} from '@angular/core';
import {addIcons} from "ionicons";
import {home, chatbubbleEllipses, person} from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon, IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {HomeContentComponent} from "../page-contents/home-content/home-content.component";
import {ChatContentComponent} from "../page-contents/chat-content/chat-content.component";
import {ProfileContentComponent} from "../page-contents/profile-content/profile-content.component";
import {UserService} from "../../services/user/user.service";
import {ProfileService} from "../../services/profile/profile.service";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    IonTab,
    IonTabs,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTabBar,
    IonTabButton,
    IonIcon,
    HomeContentComponent,
    ChatContentComponent,
    ProfileContentComponent
  ],
  standalone: true
})
export class TabsComponent implements OnInit{
  logo = 'Logo'
  current_user_profile_id = new BehaviorSubject<number>(0)
  current_user_id = new BehaviorSubject<number>(0)

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    addIcons({home, chatbubbleEllipses, person})
  }

  async ngOnInit() {
    await this.getCurrentProfileId()
  }

  async getCurrentProfileId() {
    // Get the current user id
    (await this.userService.getCurrentUser())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "User Info Access Error")
          throw error
        })
      )
      .subscribe(async (data: any) => {
        this.current_user_id.next(data.id);
        // Get the current user profile id
        (await this.profileService.getProfileInfo(data.id))
          .pipe(
            catchError(async (error) => {
              this.configService.handleError(error, "Profile Access Error")
              throw error
            })
          )
          .subscribe((data: any) => {
            this.current_user_profile_id.next(data.id);
          })
      })
  }

}
