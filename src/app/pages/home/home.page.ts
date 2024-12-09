import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {HomeContentComponent} from "../../components/page-contents/home-content/home-content.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HomeContentComponent, NavbarComponent],
})
export class HomePage {
  constructor() {}
}
