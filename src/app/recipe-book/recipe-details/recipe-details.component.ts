import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

   ChoosenRecipe!:Recipe;
   id:number=0;
  constructor(private recipeService : RecipeService,private activatedRoute:ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((res)=>{
     this.id=+res['id'];
     this.ChoosenRecipe= this.recipeService.getRecipe(this.id);
   })
  }

  onAddToShoppingList(){
    this.recipeService.AddIngredientsToShoppingList(this.ChoosenRecipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit-recipe'],{relativeTo: this.activatedRoute});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate([''],{relativeTo:this.activatedRoute})
  }
}
