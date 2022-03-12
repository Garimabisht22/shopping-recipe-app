import { Store } from '@ngrx/store';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoopingListActions from './store/shopping-list.actions';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
animations:[
  trigger('shopping-list',[
    state('in',style({
      opacity:1,
        transform : 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity:0,
        transform:'translateX(-100px)',
        'background-color' : 'green',
      }),
      animate(500)]),
      transition('* => void', [
        // style({
        //   // opacity:0,
        //   // transform:'translateX(100px)',
        // }),
        animate(300,style({
          transform : 'translateX(100px)',
          'background-color' : 'red',

        }))]),
    // transition('highlighted => normal', animate(300))



  ]),

]

})


export class ShoppingListComponent implements OnInit , OnDestroy{
ingredients !: Observable< { ingredients : Ingredient[]}> ;
  private igChangeSub: Subscription = new Subscription;

  constructor(
    private Store : Store<fromShoppingList.AppState >) { }

  ngOnInit(): void {
    this.ingredients =   this.Store.select('shoppingList');
    // console.log("ngOnInit Inside Shopping-List.ts");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientAdded
    // .subscribe(
    //   (recievedIngredients:Ingredient[])=>{
    //   this.ingredients = recievedIngredients;
    // }
    // );
  }


  onEditItem(index : number){
    this.Store.dispatch(new ShoopingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index);
  }

ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
}

}
