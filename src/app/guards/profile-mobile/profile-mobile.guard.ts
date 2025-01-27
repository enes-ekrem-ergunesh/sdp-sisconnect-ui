import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";
import {ConfigService} from "../../services/config/config.service";

export const profileMobileGuard: CanActivateFn = () => {
  const platformService = inject(PlatformService)
  const router = inject(Router)
  const configService = inject(ConfigService)

  let urlParam = window.location.href.split('/').slice(-1)[0];
  let userId = 0
  if (!urlParam) urlParam = '0'
  userId = Number(urlParam)
  if (Number.isNaN(userId)) {
    // configService.handleError(new Error("Profile ID Error"), "Profile Page Error")
    return false
  }

  if (platformService.isWeb()) {
    router.navigate(['/profile/'+userId]).then()
  } else if (platformService.isMobile()) {
    return true
  } else {
    router.navigate(['/profile/'+userId]).then()
  }

  return false;
};
