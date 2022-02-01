import { Ingredient } from './../shared/ingredients.model';
import { EventEmitter } from "@angular/core";

 export class ShoppingListService{
    ingredientAdded = new EventEmitter<Ingredient[]>();


   private ingredients:Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Mango',10)
      ];

      getIngredients(){
         return this.ingredients.slice();
      }
      addNewIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
        }

        addIngredients(ingredients:Ingredient[]){
         //   for(let ingredient of ingredients){
         //      this.addIngredients(ingredient);
         //   }
         this.ingredients.push(...ingredients);
         this.ingredientAdded.emit(this.ingredients.slice());
        }
 }