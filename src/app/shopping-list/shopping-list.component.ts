import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{

ingredients !:Ingredient[] ;
  private igChangeSub: Subscription = new Subscription;
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    console.log("ngOnInit Inside Shopping-List.ts");
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientAdded
    .subscribe(
      (recievedIngredients:Ingredient[])=>{
      this.ingredients = recievedIngredients;
    }
    );
  }

  onEditItem(index : number){
    this.shoppingListService.startedEditing.next(index);
  }

ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
}

}
