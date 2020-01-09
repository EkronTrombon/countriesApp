import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule) },
  { path: 'game', loadChildren: './pages/game/game.module#GamePageModule' },
  { path: 'geolocation', loadChildren: './pages/geolocation/geolocation.module#GeolocationPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
