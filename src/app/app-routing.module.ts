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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
