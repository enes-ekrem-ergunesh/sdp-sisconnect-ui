import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {
  CreatePostContentComponent
} from "../../components/page-contents/create-post-content/create-post-content.component";

@Component({
  selector: 'app-create-post-mobile',
  templateUrl: './create-post-mobile.page.html',
  styleUrls: ['./create-post-mobile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CreatePostContentComponent, IonBackButton, IonButtons]
})
export class CreatePostMobilePage implements OnInit {

  constructor() { }

  ngOnInit() {
    return
  }

}
