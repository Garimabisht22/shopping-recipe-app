import { RecipeService } from './../recipe.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

recipes!:Recipe[];

// @Output() recipeDetailCalled = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {

   }

  ngOnInit(): void {
    console.log("ngOnInit Inside Recipe-List.ts");
    this.recipes=this.recipeService.getRecipes();
  }

  // showRecipeDetail(recipe : Recipe){
  //   this.recipeDetailCalled.emit(recipe);
  // }
}
