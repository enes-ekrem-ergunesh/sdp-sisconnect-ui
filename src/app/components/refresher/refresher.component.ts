import { Component } from '@angular/core';
import {IonRefresher, IonRefresherContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
  imports: [
    IonRefresher,
    IonRefresherContent
  ],
  standalone: true
})
export class RefresherComponent {

  constructor() { }

  onRefresh(event: CustomEvent){
    const spinTime = 700
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete().then(() => {
      });
    }, spinTime);
    setTimeout(() => {
      window.location.reload()
    }, spinTime+280);
  }
}
