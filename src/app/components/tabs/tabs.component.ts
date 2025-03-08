import {Component, OnInit} from '@angular/core';
import {addIcons} from "ionicons";
import {home, repeat, person, search} from "ionicons/icons";
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/angular/standalone";
import {UserService} from "../../services/user/user.service";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {CreatePostFabComponent} from "../buttons/create-post-fab/create-post-fab.component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    CreatePostFabComponent
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
