import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers:[RecipeService]
})
export class RecipeBookComponent implements OnInit {
selectedRecipe!:Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log("ngOnInit Inside Recipe-Book.ts");

    this.recipeService.recipeSelectedEvent.subscribe((recipe:Recipe)=>{
      this.selectedRecipe = recipe;
    });
    console.log("Value of selectedRecipe inside recipe-book.ts",this.selectedRecipe);
  }

}
