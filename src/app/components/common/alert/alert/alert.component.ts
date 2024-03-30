import {Component, Input} from '@angular/core';
import {Alert} from "../../../../interfaces/common/alert/alert";
import { AlertService} from "../../../../services/common/alert/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  alerts!: Alert[];
  @Input() position!: string;

  constructor(private alertService: AlertService) {
    this.alertService.clearAlerts();
    this.alerts = this.alertService.alerts;
  }

}
