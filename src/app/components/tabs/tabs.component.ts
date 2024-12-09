import { Component } from '@angular/core';
import {addIcons} from "ionicons";
import {home, chatbubbleEllipses, person} from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon, IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {HomeContentComponent} from "../page-contents/home-content/home-content.component";
import {ChatContentComponent} from "../page-contents/chat-content/chat-content.component";
import {ProfileContentComponent} from "../page-contents/profile-content/profile-content.component";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    IonTab,
    IonTabs,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonButton,
    HomeContentComponent,
    ChatContentComponent,
    ProfileContentComponent
  ],
  standalone: true
})
export class TabsComponent {
  logo = 'Logo'

  constructor(
  ) {
    addIcons({home, chatbubbleEllipses, person})
  }

}
