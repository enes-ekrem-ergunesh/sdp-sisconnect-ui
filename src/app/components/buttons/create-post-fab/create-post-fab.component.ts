import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IonFab, IonFabButton, IonIcon} from "@ionic/angular/standalone";

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
  ) { }

  async onClickFabButton() {
    await this.router.navigate(["/create-post-mobile"])
  }

}
