import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipesResolverService } from "./recipe-resolver.sevice";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

const routes:Routes = [
    {
        path: '',
        component: RecipeBookComponent,
        canActivate : [AuthGuard],
        children: [
          { path: '', component: RecipeStartComponent },
          {path:'new',component:EditRecipeComponent},
          { path: ':id', component: RecipeDetailsComponent,resolve:[RecipesResolverService]},
          {path:':id/edit-recipe',component:EditRecipeComponent,resolve:[RecipesResolverService]}
        ],
      },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports:[RouterModule]

})

export class RecipesRoutingModule{
    
}