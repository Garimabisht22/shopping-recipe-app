import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() ChoosenRecipe!:Recipe;

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    
  }

  onAddToShoppingList(){
    this.recipeService.AddIngredientsToShoppingList(this.ChoosenRecipe.ingredients);
  }
}
