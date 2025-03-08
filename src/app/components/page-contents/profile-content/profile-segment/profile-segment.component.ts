import {Component, Input, OnInit} from '@angular/core';
import {IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView} from "@ionic/angular/standalone";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {ProfilePostsComponent} from "./profile-posts/profile-posts.component";
import {BehaviorSubject} from "rxjs";
import {ProfileFieldInfo} from "../../../../interfaces/profile-field-info";
import {PostInfo} from "../../../../interfaces/post-info";
import {ProfileInfo} from "../../../../interfaces/profile-info";

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
  @Input() profileFields!: BehaviorSubject<ProfileFieldInfo[]>
  @Input() profilePosts!: BehaviorSubject<PostInfo[]>

  constructor() { }

  ngOnInit() {
    return
  }

}
