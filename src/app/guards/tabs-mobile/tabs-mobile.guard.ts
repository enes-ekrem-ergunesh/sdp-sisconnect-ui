import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";

export const tabsMobileGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService)
  const router = inject(Router)

  if (platformService.isMobile()){
    return true
  }
  else if (platformService.isWeb()){
    router.navigate(['/home']).then()
  }
  else {
    router.navigate(['/home']).then()
  }

  return false;
};
