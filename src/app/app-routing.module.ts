import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path:'recipes',loadChildren:()=> import ('./recipe-book/recipes.module').then (x=> x.RecipesModule)},
  {path:'shopping-list',loadChildren:()=> import('./shopping-list/shopping.module').then(x=>x.ShoppingModule)},
  {path:'auth',loadChildren:()=> import('./auth/auth.module').then(x=>x.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
