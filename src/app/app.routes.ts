import { Routes } from '@angular/router';
import {authGuard} from "./guards/auth/auth.guard";
import {TabsComponent} from "./components/tabs/tabs.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    redirectTo: 'login-mobile',
    pathMatch: 'full',
  },
  {
    path: 'login-mobile',
    loadComponent: () => import('./pages/login-mobile/login-mobile.page').then( m => m.LoginMobilePage)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage),
    canActivate: [authGuard]
  },
  {
    path: 'profile-mobile',
    redirectTo: 'profile-mobile/0',
    pathMatch: 'full',
  },
  {
    path: 'profile-mobile/:user_id',
    loadComponent: () => import('./pages/profile-mobile/profile-mobile.page').then( m => m.ProfileMobilePage),
    canActivate: [authGuard]
  },
  {
    path: 'create-post-mobile',
    loadComponent: () => import('./pages/create-post-mobile/create-post-mobile.page').then( m => m.CreatePostMobilePage),
    canActivate: [authGuard]
  },
];
