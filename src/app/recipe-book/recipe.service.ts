import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredients.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from './../shopping-list/store/shopping-list.reducer';
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Cheese Tortillian in Creamy Marinara ',
    //   'Fresh basil-infused marinara sauce is perfectly complimented with pillows of tangy goat cheese.',
    //   'https://www.acouplecooks.com/wp-content/uploads/2021/03/Cheese-Tortellini-011.jpg',
    //   [
    //     new Ingredient('Cream', 1),
    //     new Ingredient('Cheese', 1),
    //     new Ingredient('Basil', 1),
    //   ]
    // ),
    // new Recipe(
    //   'Avacado Grilled Cheese Sandwich',
    //   'ADD avacoade and tomato to a standard grilled cheese makes it fit for serving to company.',
    //   'https://www.acouplecooks.com/wp-content/uploads/2013/09/Avocado-Grilled-Cheese-002.jpg',
    //   [
    //     new Ingredient('Tomato', 3),
    //     new Ingredient('Avacoade', 2),
    //     new Ingredient('Cheese', 1),
    //   ]
    // ),
    // new Recipe(
    //   'Biryani',
    //   'The meat (and vegetables, if used) and rice are cooked separately before being layered and cooked together with a mixture of spices. The type of meat used varies; goat, chicken, beef, lamb, fish or prawns are used according to the region, with eggs and potatoes sometimes added as well.',
    //   'https://www.tasteofhome.com/wp-content/uploads/2021/01/the-hyderabadi-chicken-biryani-is-photographed-at-akshaya-168918303.jpg?resize=768,768',
    //   [new Ingredient('Rice', 3), new Ingredient('Chicken', 2)]
    // ),
    // new Recipe(
    //   'Chole Bhature         ',
    //   'One of the most popular vegetarian North Indian recipes, chole refers to the spicy garbanzo bean and tomato gravy (also known as chana masala), while bhature are the fluffy deep-fried flatbreads served alongside it. Brimming with garam masala, turmeric, red chili powder and dried mango (amchur) powder, the gravy is a tangy delight full of protein, which goes perfectly with soft, crispy bhature.',
    //   'https://img-global.cpcdn.com/recipes/a8d65b425be0caf9/751x532cq70/%E0%A4%AA%E0%A4%82%E0%A4%9C%E0%A4%BE%E0%A4%AC%E0%A5%80-%E0%A4%9B%E0%A5%8B%E0%A4%B2%E0%A5%87-%E0%A4%AD%E0%A4%9F%E0%A5%82%E0%A4%B0%E0%A5%87-punjabi-chole-bhature-recipe-in-hindi-%E0%A4%B0%E0%A5%87%E0%A4%B8%E0%A4%BF%E0%A4%AA%E0%A5%80-%E0%A4%AE%E0%A5%81%E0%A4%96%E0%A5%8D%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%B0.jpg',
    //   [new Ingredient('Chole', 3), new Ingredient('Oil', 1)]
    // ),
  ];
  constructor(

    private store: Store<fromShoppingList.AppState>
  ) {}
  getRecipes() {
    return this.recipes.slice();
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {

this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // this.slService.addIngredients(ingredients);
    // this.slService.ingredientAdded.next(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
}
