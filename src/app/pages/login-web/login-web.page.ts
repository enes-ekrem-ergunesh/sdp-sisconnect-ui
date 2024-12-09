import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {LoginContentComponent} from "../../components/page-contents/login-content/login-content.component";

@Component({
  selector: 'app-login-web',
  templateUrl: './login-web.page.html',
  styleUrls: ['./login-web.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoginContentComponent]
})
export class LoginWebPage implements OnInit {

  constructor() { }

  ngOnInit() {
    return
  }

}
