import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar} from "@ionic/angular";

@Component({
  selector: 'app-custom-ion-searchbar',
  templateUrl: './custom-ion-searchbar.component.html',
  styleUrls: ['./custom-ion-searchbar.component.scss'],
})
export class CustomIonSearchbarComponent  implements OnInit, AfterViewInit {
  @ViewChild('ionSearchbar', {static: false}) ionSearchbar!: IonSearchbar;

  constructor() { }

  ngOnInit() {
    return
  }

  ngAfterViewInit(): void {
    this.ionSearchbar.getInputElement().then((inputElement) => {
      inputElement.maxLength = 0;
      const className = inputElement.className
      inputElement.className = className + ' input-hide-caret';
    });
  }

}
