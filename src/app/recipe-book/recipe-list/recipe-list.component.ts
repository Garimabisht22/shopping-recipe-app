import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

recipes!:Recipe[];
  subscription!: Subscription;

// @Output() recipeDetailCalled = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {

   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    console.log("ngOnInit Inside Recipe-List.ts");
    this.recipes=this.recipeService.getRecipes();
  }

  // showRecipeDetail(recipe : Recipe){
  //   this.recipeDetailCalled.emit(recipe);
  // }
}
