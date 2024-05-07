import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "../../services/sis-connect/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RouteAuthorizationGuard {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    // console.log('route: ' + route.routeConfig?.path)

    if (await this.userService.isAuthorized()) { // if the user is authorized and tries to access...
      if (route.routeConfig?.path === 'login') { // ... login page
        await this.router.navigate(['/home']);
        return false;
      } else { // ... any other page
        return true;
      }
    } else { // if the user is not authorized and tries to access...
      if (route.routeConfig?.path === 'login') { // ... login page
        return true;
      } else { // ... any other page
        await this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
