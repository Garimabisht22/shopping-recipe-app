import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { RecipesResolverService } from './recipe-book/recipe-resolver.sevice';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeBookComponent,
    canActivate : [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      {path:'new',component:EditRecipeComponent},
      { path: ':id', component: RecipeDetailsComponent,resolve:[RecipesResolverService]},
      {path:':id/edit-recipe',component:EditRecipeComponent,resolve:[RecipesResolverService]}
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
