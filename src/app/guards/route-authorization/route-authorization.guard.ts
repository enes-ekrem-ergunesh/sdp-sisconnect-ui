import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/sis-connect/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RouteAuthorizationGuard{

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  async canActivate() {
    console.log('RouteAuthorizationGuard: ' + await this.userService.isAuthorized())
    await this.router.navigate(['login']);
    return !!(await this.userService.isAuthorized());
  }
}
