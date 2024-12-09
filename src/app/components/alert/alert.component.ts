import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonAlert} from "@ionic/angular/standalone";
import {PlatformService} from "../../services/platform/platform.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    IonAlert,
    NgIf
  ],
  standalone: true
})
export class AlertComponent  implements OnInit {
  @Input() isAlertOpen = false;
  @Input() alertHeader = 'Alert';
  @Input() alertSubHeader = '';
  @Input() alertMessage = 'This is an alert message.';

  @Output() setAlertOpen = new EventEmitter<boolean>();

  alertButtons = ['Ok'];

  constructor(
    private platformService: PlatformService
  ) { }

  ngOnInit() {

    return
  }

  setOpen(isOpen: boolean) {
    this.setAlertOpen.emit(isOpen);
  }

  isIonic() {
    return this.platformService.isMobile()
  }

}
