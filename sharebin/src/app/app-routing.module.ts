import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'new-item', loadChildren: './items/new-item/new-item.module#NewItemPageModule' },
  { path: 'new-item/:id', loadChildren: './items/new-item/new-item.module#NewItemPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
