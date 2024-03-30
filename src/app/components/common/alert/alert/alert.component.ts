import { Component } from '@angular/core';
import {Alert} from "../../../../interfaces/common/alert/alert";
import { AlertsService} from "../../../../services/common/alert/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  alerts!: Alert[];

  constructor(private alertService: AlertsService) {
    this.alertService.clearAlerts();
    this.alerts = this.alertService.alerts;
  }

}
