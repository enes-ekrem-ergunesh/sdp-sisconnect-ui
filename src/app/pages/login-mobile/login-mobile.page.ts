import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {LoginContentComponent} from "../../components/page-contents/login-content/login-content.component";

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.page.html',
  styleUrls: ['./login-mobile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoginContentComponent]
})
export class LoginMobilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
