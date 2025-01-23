import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ProfileContentComponent} from "../../components/page-contents/profile-content/profile-content.component";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {UserService} from "../../services/user/user.service";
import {PlatformService} from "../../services/platform/platform.service";
import {NgIf} from "@angular/common";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [FormsModule, NavbarComponent, ProfileContentComponent, NgIf, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar]
})
export class ProfilePage implements OnInit {
  current_user_id = new BehaviorSubject<number>(0)

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const user_id = this.route.snapshot.paramMap.get('user_id');

    if (user_id) {
      if (user_id !== "0") {
        try {
          this.current_user_id.next(Number(user_id))
        }
        catch (error) {
          this.configService.handleError(error, "Profile ID Error")
        }
      }
      else{
        await this.getCurrentProfileId()
      }
    }
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



}
