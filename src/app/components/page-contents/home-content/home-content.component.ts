import {Component, OnInit, Optional} from '@angular/core';
import {IonButton, IonRouterOutlet} from "@ionic/angular/standalone";
import {AuthService} from "../../../services/auth/auth.service";
import {Platform} from "@ionic/angular";
import {App} from "@capacitor/app";

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

  constructor(
    private authService: AuthService,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()){
        App.exitApp().then()
      }
    })

  }

  ngOnInit() {
    return
  }

  logout(){
    this.authService.logout()
  }

}
