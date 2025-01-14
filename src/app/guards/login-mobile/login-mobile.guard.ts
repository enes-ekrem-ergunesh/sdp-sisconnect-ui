import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";
import {StorageService} from "../../services/storage/storage.service";

export const loginMobileGuard: CanActivateFn = async (route, state) => {
  const platformService = inject(PlatformService)
  const storageService = inject(StorageService)
  const router = inject(Router)

  await storageService.init()
  if (await storageService.get('token')) {
    await router.navigate(['/tabs'])
    return false
  }

  if (platformService.isMobile()) {
    return true
  } else if (platformService.isWeb()) {
    router.navigate(['/login-web']).then()
  } else {
    router.navigate(['/login-web']).then()
  }

  return false;
};
