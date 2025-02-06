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

  isMobileWeb(): boolean {
    return this.platform.is('mobileweb');
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  isDesktop(): boolean {
    return this.platform.is('desktop');
  }

  getPlatform(): string {
    if (this.isMobile()) {
      return 'mobile';
    } else if (this.isMobileWeb()) {
      return 'mobileweb';
    } else if (this.isDesktop()) {
      return 'desktop';
    } else {
      return 'unknown';
    }
  }

  getPlatformAdvanced(): string {
    return this.platform.platforms().join(', ');
  }


}
