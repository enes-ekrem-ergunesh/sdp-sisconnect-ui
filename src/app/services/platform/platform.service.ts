import { Injectable } from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    private platform: Platform
  ) { }

  isMobile(): boolean {
    return this.platform.is('mobile');
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  isMobileWeb(): boolean {
    return this.platform.is('mobileweb');
  }

  isDesktop(): boolean {
    // return this.platform.is('desktop');
    return false;
  }

  isElectron(): boolean {
    // return this.platform.is('electron');
    return false;
  }

  isWeb(): boolean {
    // return this.isDesktop() && !this.isElectron();
    return false;
  }

  getPlatform(): string {
    return 'mobile';
    // if (this.isMobile()) {
    //   return 'mobile';
    // } else if (this.isElectron()) {
    //   return 'electron';
    // } else if (this.isWeb()) {
    //   return 'web';
    // } else {
    //   return 'unknown';
    // }
  }

  getPlatformAdvanced(): string {
    return this.platform.platforms().join(', ');
  }


}
