import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input()
  recipe!: Recipe;
  // @Output()
  // clickedRecipe = new EventEmitter<void>();

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    console.log("ngOnInit Inside Recipe-Item.ts");

  }
onClickingRecipe(){
   this.recipeService.recipeSelectedEvent.emit(this.recipe);

}
}
