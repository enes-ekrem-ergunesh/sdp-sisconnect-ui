import { Component, OnInit } from '@angular/core';
import {IonButton} from "@ionic/angular/standalone";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  imports: [
    IonButton
  ],
  standalone: true
})
export class ProfilePostsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    return
  }

}
