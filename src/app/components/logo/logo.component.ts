import { Component } from '@angular/core';
import {IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [
    IonTitle,
    IonToolbar
  ],
  standalone: true
})
export class LogoComponent {

  constructor() { }

}
