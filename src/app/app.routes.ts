import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth/auth.guard";
import {loginMobileGuard} from "./guards/login-mobile/login-mobile.guard";
import {loginWebGuard} from "./guards/login-web/login-web.guard";
import {TabsComponent} from "./components/tabs/tabs.component";
import {tabsMobileGuard} from "./guards/tabs-mobile/tabs-mobile.guard";
import {homeWebGuard} from "./guards/home-web/home-web.guard";
import {profileGuard} from "./guards/profile/profile.guard";
import {profileMobileGuard} from "./guards/profile-mobile/profile-mobile.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard, homeWebGuard]
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [authGuard, tabsMobileGuard]
  },
  {
    path: 'login',
    redirectTo: 'login-web',
    pathMatch: 'full',
  },
  {
    path: 'login-mobile',
    loadComponent: () => import('./pages/login-mobile/login-mobile.page').then( m => m.LoginMobilePage),
    canActivate: [loginMobileGuard]
  },
  {
    path: 'login-web',
    loadComponent: () => import('./pages/login-web/login-web.page').then( m => m.LoginWebPage),
    canActivate: [loginWebGuard]
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'profile',
    redirectTo: 'profile/0',
    pathMatch: 'full',
  },
  {
    path: 'profile-mobile',
    redirectTo: 'profile-mobile/0',
    pathMatch: 'full',
  },
  {
    path: 'profile/:user_id',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [authGuard, profileGuard]
  },
  {
    path: 'profile-mobile/:user_id',
    loadComponent: () => import('./pages/profile-mobile/profile-mobile.page').then( m => m.ProfileMobilePage),
    canActivate: [authGuard, profileMobileGuard]
  },
];
