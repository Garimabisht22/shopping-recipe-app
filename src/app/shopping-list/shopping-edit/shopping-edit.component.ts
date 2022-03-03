import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true })
  NameInput!: ElementRef;
  @ViewChild('amountInput', { static: true })
  AmountInput!: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  shoppingForm!: FormGroup;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    console.log('ngOnInit Inside Shopping-Item.ts');
    this.shoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
  onAdd() {
    console.log(this.shoppingForm.get('name')?.value);
    console.log(this.shoppingForm.get('amount')?.value);
    const ingName = this.shoppingForm.get('name')?.value;
    const ingAmount = this.shoppingForm.get('amount')?.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.upgradeIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingForm.reset();
  }
  onDelete() {
    this.shoppingForm.reset();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode=false
  }
  ngOnDestroy() {}
}
