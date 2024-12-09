import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";

export const loginMobileGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService)
  const router = inject(Router)

  if (platformService.isMobile()){
    return true
  }
  else if (platformService.isWeb()){
    router.navigate(['/login-web']).then()
  }
  else {
    router.navigate(['/login-web']).then()
  }

  return false;
};
