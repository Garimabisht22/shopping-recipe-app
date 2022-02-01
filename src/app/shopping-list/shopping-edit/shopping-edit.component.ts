import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true })
  NameInput!: ElementRef; 
  @ViewChild('amountInput', { static: true })
 AmountInput!: ElementRef; 
  
// @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService:ShoppingListService) { 

  }

  ngOnInit(): void {
    console.log("ngOnInit Inside Shopping-Item.ts");
  }
   onAdd(){
    console.log(this.NameInput.nativeElement.value);
    console.log(this.AmountInput.nativeElement.value);
    const ingName = this.NameInput.nativeElement.value;
    const ingAmount = this.AmountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.shoppingListService.addNewIngredient(newIngredient);

  }
}
