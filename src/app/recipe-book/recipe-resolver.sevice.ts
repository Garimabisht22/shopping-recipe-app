import { RecipeService } from './recipe.service';
import { DatastorageService } from './../shared/datastorage.service';
import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn : 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

constructor(private dataStorageService : DatastorageService,private recipeService : RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();

        if(recipes.length ===0)
{      return this.dataStorageService.fetchRecipes();
}    else{
    return recipes;
}}

}