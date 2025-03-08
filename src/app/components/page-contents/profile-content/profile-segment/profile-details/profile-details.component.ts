import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
  @Input() profileFields!: BehaviorSubject<ProfileFieldInfo[]>

  isOwner = false

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isOwner = window.location.href.includes('tabs')
    this.cdr.detectChanges()
    return
  }
  logout(){
    this.authService.logout()
  }

}
