import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";

export const loginWebGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService)
  const router = inject(Router)

  if (platformService.isWeb()){
    return true
  }
  else if (platformService.isMobile()){
    router.navigate(['/login-mobile']).then()
  }
  else {
    router.navigate(['/login-web']).then()
  }

  return false;
};
