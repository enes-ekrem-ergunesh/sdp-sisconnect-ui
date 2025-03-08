import { Component } from '@angular/core';
import {IonContent, IonHeader, IonToolbar} from "@ionic/angular/standalone";
import {LogoComponent} from "../../logo/logo.component";
import {ProfileContentComponent} from "../profile-content/profile-content.component";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-own-profile-content',
  templateUrl: './own-profile-content.component.html',
  styleUrls: ['./own-profile-content.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    LogoComponent,
    IonContent,
    ProfileContentComponent
  ],
  standalone: true
})
export class OwnProfileContentComponent  {
  currentUser = this.userService.currentUser;

  constructor(
    private userService: UserService,
  ) {}

}
