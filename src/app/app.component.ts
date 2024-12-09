import {Component, Renderer2} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {ColorModeService} from "./services/color-mode/color-mode.service";
import {RouterOutlet} from "@angular/router";
import {PlatformService} from "./services/platform/platform.service";
import {NgIf} from "@angular/common";
import {AlertComponent} from "./components/alert/alert.component";
import {ConfigService} from "./services/config/config.service";
import {BehaviorSubject} from "rxjs";
import {Modal} from "bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, RouterOutlet, NgIf, AlertComponent],
})
export class AppComponent {
  platform!: string

  isAlertOpen!: BehaviorSubject<boolean>;
  alertHeader!: BehaviorSubject<string>;
  alertMessage!: BehaviorSubject<string>;

  bsAlertOpen: boolean = false;

  constructor(
    private colorModeService: ColorModeService,
    private renderer: Renderer2,
    private platformService: PlatformService,
    private configService: ConfigService
  ) {
    this.colorModeService.theme$.subscribe(theme => {
      // Update the `data-bs-theme` attribute on the HTML element
      this.renderer.setAttribute(document.documentElement, 'data-bs-theme', theme)
    })
    this.platform = this.platformService.getPlatform()

    this.isAlertOpen = this.configService.isAlertOpen;
    this.alertHeader = this.configService.alertHeader;
    this.alertMessage = this.configService.alertMessage;

    // Show/hide bootstrap alert
    this.isAlertOpen.subscribe(isOpen => {
      if (isOpen === this.bsAlertOpen)
        return;
      this.bsAlertOpen = isOpen;
      let bsAlert = new Modal('#bsAlert');
      if (isOpen) {
        console.log('showing bs alert')
        bsAlert.show();
      } else {
        console.log('hiding bs alert')
        this.bootstrapAlertHide(bsAlert);
      }
    })
  }

  isMobile(): boolean {
    return this.platformService.isMobile()
  }

  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen.next(isOpen);
  }

  bootstrapAlertHide(bsAlert: Modal) {
    let bsAlertElement = document.getElementById('bsAlert');
    if (bsAlertElement?.classList.contains('show')){
      console.log('FORCE REMOVING BS ALERT')
      bsAlert.hide();
      bsAlertElement?.classList.remove('show');
      bsAlertElement?.removeAttribute('aria-modal');
      bsAlertElement?.removeAttribute('role');
      bsAlertElement?.removeAttribute('style');
      bsAlertElement?.setAttribute('aria-hidden', 'true');
      let backdropElements = document.getElementsByClassName('modal-backdrop');
      for (let i = 0; i < backdropElements.length; i++) {
        backdropElements[i].remove();
      }
    }
  }
}
