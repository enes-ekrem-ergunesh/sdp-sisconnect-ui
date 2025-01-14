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
    return this.platform.is('desktop');
  }

  isElectron(): boolean {
    return this.platform.is('electron');
  }

  isWeb(): boolean {
    return this.isDesktop() && !this.isElectron();
  }

  getPlatform(): string {
    if (this.isMobile()) {
      return 'mobile';
    } else if (this.isElectron()) {
      return 'electron';
    } else if (this.isWeb()) {
      return 'web';
    } else {
      return 'unknown';
    }
  }

  getPlatformAdvanced(): string {
    return this.platform.platforms().join(', ');
  }


}
