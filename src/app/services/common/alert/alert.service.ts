import { Injectable } from '@angular/core';
import {Alert} from "../../../interfaces/common/alert/alert";
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() {}

  public alerts: Alert[] = [];

  createAlert(status_code: number, message: string) {
    const id = this.alertsCount() + 1; // generate unique id
    const alert: Alert = {id: id, status_code: status_code, message: message, timeout: 5} // create alert
    this.alerts.push(alert); // add alert to the alerts array
    setTimeout(() => { // remove alert after visible_for_seconds
      this.removeAlert(alert); // remove alert
    }, alert.timeout * 1000); // visible_for_seconds is in seconds, so we need to multiply by 1000 to get milliseconds
    return alert; // return alert
  }

  public removeAlert(alert: Alert) {
    /**
     * Remove alert from the alerts array
     *
     * @param {Alert} alert - alert object
     * @return {void}
     */
    const index = this.alerts.indexOf(alert); // get index of the alert
    if (index > -1) { // if alert exists
      // this.alerts.splice(index, 1); // remove alert
      const element = document.getElementById(alert.id.toString()) as Element;
      const bsAlert = new bootstrap.Alert(element);
      bsAlert.close(); // close alert
    }
  }

  public pauseAlertTimer(alert: Alert) {
    /**
     * Pause alert timer
     *
     * @param {Alert} alert - alert object
     * @return {void}
     */
    const index = this.alerts.indexOf(alert);
    if (index > -1) {
      this.alerts.splice(index, 1); // remove alert
      alert.timeout = 10000; // set visible_for_seconds to 10000
      this.alerts.splice(index, 0, alert); // add alert back to the same position
    }
  }

  public clearAlerts() {
    /**
     * Clear all alerts
     *
     * @return {void}
     */
    this.alerts = [];
  }

  alertsCount() {
    return this.alerts.length;
  }
}
