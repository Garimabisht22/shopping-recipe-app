import { RecipeService } from './../recipe-book/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatastorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-20bc7-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
  return this.http
      .get<Recipe[]>(
        'https://recipe-20bc7-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((res) => {
          return res.map((recipe) => {
            console.log("Printing type inside res.map")
            console.log(typeof(recipe))
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });

        }),tap(recipes=>{
          this.recipeService.setRecipes(recipes);
        })
        
      );

      
  }
}
