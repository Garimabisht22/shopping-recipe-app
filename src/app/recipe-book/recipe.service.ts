import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
recipeSelectedEvent = new EventEmitter<number>();


   private recipes:Recipe[] =[
        new Recipe(
        'Cheese Tortillian in Creamy Marinara ',
         'Fresh basil-infused marinara sauce is perfectly complimented with pillows of tangy goat cheese.',
         "https://www.acouplecooks.com/wp-content/uploads/2021/03/Cheese-Tortellini-011.jpg",
         [
             new Ingredient("Cream",1),
             new Ingredient("Cheese",1),
             new Ingredient("Basil",1),

         ]
         ),
        
         new Recipe("Avacado Grilled Cheese Sandwich",
        "ADD avacoade and tomato to a standard grilled cheese makes it fit for serving to company.",
        "https://www.acouplecooks.com/wp-content/uploads/2013/09/Avocado-Grilled-Cheese-002.jpg",
        [
            new Ingredient("Tomato",3),
            new Ingredient("Avacoade",2),
            new Ingredient("Cheese",1),
        ])
        ];
constructor(private slService:ShoppingListService){

}
    getRecipes(){
        return this.recipes.slice();
    }

    AddIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
        this.slService.ingredientAdded.emit();
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

}