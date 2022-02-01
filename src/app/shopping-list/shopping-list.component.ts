import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

ingredients !:Ingredient[] ;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    console.log("ngOnInit Inside Shopping-List.ts");
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientAdded
    .subscribe(
      (recievedIngredients:Ingredient[])=>{
      this.ingredients = recievedIngredients;
    }
    );
  }


}
