import {Injectable} from '@angular/core';
import {Alert} from "../../../interfaces/common/alert/alert";
import * as bootstrap from 'bootstrap';
import {AlertCallback} from "../../../interfaces/common/alert/alert-callback";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  public alerts: Alert[] = [];

  createAlert(status_code: number, message: string, callback?: AlertCallback) {
    if (this.haveAlerts(status_code) && [401].includes(status_code)) {
      return this.getAlerts(status_code)[0];
    }
    const id = this.alertsCount() + 1; // generate unique id
    const alert: Alert = {id: id, status_code: status_code, message: message, timeout: 3} // create alert
    this.alerts.push(alert); // add alert to the alerts array
    setTimeout(() => { // remove alert after visible_for_seconds
      this.removeAlert(alert); // remove alert
    }, alert.timeout * 1000); // visible_for_seconds is in seconds, so we need to multiply by 1000 to get milliseconds
    if (callback) {
      callback(alert); // call the callback function if it exists
    }
    return alert; // return alert
  }

  haveAlerts(status_code: number) {
    return this.alerts.filter(alert => alert.status_code === status_code).length > 0;
  }

  getAlerts(status_code: number) {
    return this.alerts.filter(alert => alert.status_code === status_code);
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
      // remove alert from the alerts array after 1 second
      setTimeout(() => {
        this.alerts.splice(index, 1); // remove alert
      }, 300);
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
