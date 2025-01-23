import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";

export const homeWebGuard: CanActivateFn = (route, state) => {
  const platformService = inject(PlatformService)
  const router = inject(Router)

  if (platformService.isWeb()) {
    return true
  } else if (platformService.isMobile()) {
    router.navigate(['/tabs']).then()
  } else {
    router.navigate(['/home']).then()
  }

  return false;
};
