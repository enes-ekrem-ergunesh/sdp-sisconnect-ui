import { Component, OnInit } from '@angular/core';
import {IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView} from "@ionic/angular/standalone";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {ProfilePostsComponent} from "./profile-posts/profile-posts.component";

@Component({
  selector: 'app-profile-segment',
  templateUrl: './profile-segment.component.html',
  styleUrls: ['./profile-segment.component.scss'],
  imports: [
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSegmentContent,
    IonSegmentView,
    ProfileDetailsComponent,
    ProfilePostsComponent
  ],
  standalone: true
})
export class ProfileSegmentComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    return
  }

}
