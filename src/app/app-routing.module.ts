import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsComponent} from "./ui/common/tabs/tabs.component";

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./ui/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'connections',
        loadChildren: () => import('./ui/connections/connections.module').then((m) => m.ConnectionsPageModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./ui/notifications/notifications.module').then((m) => m.NotificationsPageModule),
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./ui/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./ui/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./ui/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./ui/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./ui/message/message.module').then( m => m.MessagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
