import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  animations: [
    trigger('divState',[
      state('normal',style({
          'background-color' : 'red',
          transform : 'translateX(0)'
      })),
      state('highlighted',style({
        'background-color' : 'blue',
        transform : 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(300))



    ]),
    trigger('wildstate',[
      state('normal',style({
          'background-color' : 'red',
          transform : 'translateX(0) scale(1)',
          "border-radius": "0",

      })),
      state('highlighted',style({
        'background-color' : 'blue',
        transform : 'translateX(100px) scale(1)',
        "border-radius": "0",

      })),
      state('shrinken',style({
        'background-color' : 'green',
        transform : 'translateX(0) scale(0.5)',
        "border-radius": "0",

      })),
      transition('normal => highlighted', animate(300)),
       transition('highlighted => normal', animate(800)),
       transition('shrinken <=> *', [style({
         'background-color': 'orange'
       }),
       animate(1000,style({
         borderRadius : '50px'
       })
       ),
      animate(500)]
       )

    ]),
  ]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true })
  NameInput!: ElementRef;
  @ViewChild('amountInput', { static: true })
  AmountInput!: ElementRef;
  state = 'normal';
  wildState = 'normal';
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  shoppingForm!: FormGroup;
  editMode = false;
   editedItemIndex!: number;
  editedItem!: Ingredient;
  subscription: Subscription;
  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {console.log("printing value of editMode");
  console.log(this.editMode)
  this.shoppingForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        console.log('print stateDATA')
        console.log(stateData)
        console.log('print stateDATA.index')
        console.log(stateData.editedIngredientIndex)

        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
           this.editedItemIndex = stateData.editedIngredientIndex;
           this.shoppingForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount,
              });
        } else {
          this.editMode = false;
        }
      });

    // console.log('ngOnInit Inside Shopping-Item.ts');
    // this.shoppingForm = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   amount: new FormControl(null, Validators.required),
    // });

    // this.shoppingListService.startedEditing.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.shoppingListService.getIngredient(index);
    //   this.shoppingForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount,
    //   });
    // });
  }
  onAdd() {
this.state=='normal'?this.state = 'highlighted':this.state = 'normal';

this.wildState=='normal'?this.wildState = 'highlighted':this.wildState = 'normal';



    console.log(this.shoppingForm.get('name')?.value);
    console.log(this.shoppingForm.get('amount')?.value);
    const ingName = this.shoppingForm.get('name')?.value;
    const ingAmount = this.shoppingForm.get('amount')?.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          // index: this.editedItemIndex,
          newIngredient
        )
      );
      // this.shoppingListService.upgradeIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;

    this.shoppingForm.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {

    this.wildState ='shrinken';

    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.onClear();


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
