import { Ingredient } from './../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Mango', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }
  upgradeIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    //   for(let ingredient of ingredients){
    //      this.addIngredients(ingredient);
    //   }
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index,1);
    this.ingredientAdded.next(this.ingredients.slice())
  }
}
