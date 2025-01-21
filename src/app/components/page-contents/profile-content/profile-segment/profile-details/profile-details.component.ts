import {Component, Input, OnInit} from '@angular/core';
import {IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {ProfileFieldInfo} from "../../../../../interfaces/profile-field-info";

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
    NgSwitchDefault
  ],
  standalone: true
})
export class ProfileDetailsComponent  implements OnInit {
  @Input() profile_fields!: BehaviorSubject<ProfileFieldInfo[]>

  constructor() { }

  ngOnInit() {
    return
  }

}
