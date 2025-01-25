import {Component, OnInit} from '@angular/core';
import {addIcons} from "ionicons";
import {home, repeat, person, search} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonSearchbar, IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {HomeContentComponent} from "../page-contents/home-content/home-content.component";
import {ProfileContentComponent} from "../page-contents/profile-content/profile-content.component";
import {UserService} from "../../services/user/user.service";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ConnectionsContentComponent} from "../page-contents/connections-content/connections-content.component";

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
    ProfileContentComponent,
    IonButtons,
    IonButton,
    RouterLink,
    RouterLinkActive,
    ConnectionsContentComponent
  ],
  standalone: true
})
export class TabsComponent implements OnInit{
  logo = 'Logo'
  current_user_id = new BehaviorSubject<number>(0)

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    addIcons({home, repeat, person, search})
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
      })
  }

  protected readonly window = window;
}
