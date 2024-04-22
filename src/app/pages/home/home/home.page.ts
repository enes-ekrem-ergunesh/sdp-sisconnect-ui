import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../services/common/alert/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message: string = "";

  constructor(
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {
    console.log('Home page');
  }

  error(version: number) {
    switch (version) {
      case 1:
        this.alertService.createAlert(404, 'This is an error message 1');
        break;
      case 2:
        this.alertService.createAlert(500, 'This is an error message 2');
        break;
    }
  }
}
