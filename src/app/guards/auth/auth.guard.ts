import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {catchError} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {StorageService} from "../../services/storage/storage.service";
import {ConfigService} from "../../services/config/config.service";

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService)
  const storageService = inject(StorageService)
  const configService = inject(ConfigService)
  const router = inject(Router)

  await storageService.init();

  if (!await storageService.get('token')) {
    router.navigate(['/login']).then()
    return false
  }

  (await authService.verifyToken())
    .pipe(
      catchError(async (error) => {
        configService.handleError(error, 'Authentication Error')
        throw error
      })
    )
    .subscribe( (response) => {
        console.log(response)
      }

    )


  return true;
};
