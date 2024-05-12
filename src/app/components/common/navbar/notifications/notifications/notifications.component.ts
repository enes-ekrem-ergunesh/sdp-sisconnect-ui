import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ConnectionRequest} from "../../../../../interfaces/sis-connect/connection/connection-request";
import {ConnectionService} from "../../../../../services/sis-connect/connection/connection.service";
import {AlertService} from "../../../../../services/common/alert/alert.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  connectionRequests = new BehaviorSubject<ConnectionRequest[]>([])
  notificationContainerVisible = false

  constructor(
    private connectionService: ConnectionService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.getConnectionRequests().then()
  }

  toggleNotificationContainer() {
    this.notificationContainerVisible = !this.notificationContainerVisible
  }

  getNotificationContainerVisibility() {
    return this.notificationContainerVisible ? 'block' : 'none'
  }

  async getConnectionRequests() {
    (await this.connectionService.get_connection_requests()).subscribe((connections) => {
      this.connectionRequests = new BehaviorSubject(connections)
      console.log("Connections:", connections)
    })
  }

  async acceptConnectionRequest(connectionRequestId: number) {
    (await this.connectionService.accept_connection(connectionRequestId)).subscribe(m => {
      this.alertService.createAlert(200, m.message)
      this.getConnectionRequests()
    })
  }

}
