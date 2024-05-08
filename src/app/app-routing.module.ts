import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RouteAuthorizationGuard} from "./guards/route-authorization/route-authorization.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home/home.module').then(m => m.HomePageModule),
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login/login.module').then( m => m.LoginPageModule),
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile/:username',
    loadChildren: () => import('./pages/user/profile/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./pages/common/not-found/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
