import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {PlatformService} from "../../services/platform/platform.service";
import {StorageService} from "../../services/storage/storage.service";

export const loginWebGuard: CanActivateFn = async (route, state) => {
  const platformService = inject(PlatformService)
  const storageService = inject(StorageService)
  const router = inject(Router)

  await storageService.init()
  if (await storageService.get('token')) {
    await router.navigate(['/tabs'])
    return false
  }

  if (platformService.isWeb()) {
    return true
  } else if (platformService.isMobile()) {
    router.navigate(['/login-mobile']).then()
  } else {
    router.navigate(['/login-web']).then()
  }

  return false;
};
