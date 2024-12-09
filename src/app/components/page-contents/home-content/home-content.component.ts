import { Component, OnInit } from '@angular/core';
import {IonButton} from "@ionic/angular/standalone";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  imports: [
    IonButton
  ],
  standalone: true
})
export class HomeContentComponent  implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    return
  }

  logout(){
    this.authService.logout()
  }

}
