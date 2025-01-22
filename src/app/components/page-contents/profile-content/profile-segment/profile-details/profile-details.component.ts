import {Component, Input, OnInit} from '@angular/core';
import {IonButton, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {ProfileFieldInfo} from "../../../../../interfaces/profile-field-info";
import {AuthService} from "../../../../../services/auth/auth.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    NgForOf,
    DatePipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    IonButton
  ],
  standalone: true
})
export class ProfileDetailsComponent  implements OnInit {
  @Input() profile_fields!: BehaviorSubject<ProfileFieldInfo[]>

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    return
  }
  logout(){
    this.authService.logout()
  }

}
