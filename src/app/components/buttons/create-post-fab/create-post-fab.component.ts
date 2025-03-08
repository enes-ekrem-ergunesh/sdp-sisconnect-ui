import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IonFab, IonFabButton, IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";

@Component({
  selector: 'app-create-post-fab',
  templateUrl: './create-post-fab.component.html',
  styleUrls: ['./create-post-fab.component.scss'],
  imports: [
    IonFab,
    IonFabButton,
    IonIcon
  ],
  standalone: true
})
export class CreatePostFabComponent {

  constructor(
    private router: Router
  ) {
    addIcons({add})
  }

  async onClickFabButton() {
    await this.router.navigate(["/create-post-mobile"])
  }

}
