import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";
import {ConfigService} from "../../services/config/config.service";

export const profileGuard: CanActivateFn = async () => {
  const platformService = inject(PlatformService)
  const router = inject(Router)
  const configService = inject(ConfigService)

  let urlParam = window.location.href.split('/').slice(-1)[0];
  let userId = 0
  if (!urlParam) urlParam = '0'
  userId = Number(urlParam)
  console.log("userId: ", typeof userId, Number.isNaN(userId))
  if (Number.isNaN(userId)) {
    configService.handleError(new Error("Profile ID Error"), "Profile Page Error")
    return false
  }

  if (platformService.isWeb()) {
    return true
  } else if (platformService.isMobile()) {
    router.navigate(['/profile-mobile/'+userId]).then()
  } else {
    router.navigate(['/profile/'+userId]).then()
  }

  return false;
};
