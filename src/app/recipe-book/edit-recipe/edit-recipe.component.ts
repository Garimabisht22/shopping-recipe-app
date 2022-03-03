import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router
  ) {}

  id!: number;
  editMode = false;
  newRecipeForm!: FormGroup;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((res) => {
      this.id = +res['id'];
      this.editMode = res['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.newRecipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.newRecipeForm.get('ingredients')).controls;
  }

  onAddedIngredient() {
    (<FormArray>this.newRecipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    ); 
  }

  onDeleteIngredient(index :any){
    (<FormArray>this.newRecipeForm.get('ingredients')).removeAt(index)
  }

  onRecipeFormSubmitted() {
    // const newRecipe = new Recipe(
    //   this.newRecipeForm.value['name'],
    //   this.newRecipeForm.value['desc'],
    //   this.newRecipeForm.value['imgUrl'],
    //   this.newRecipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.newRecipeForm.value);
    } else {
      this.recipeService.addRecipe(this.newRecipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activatedRouter})

  }
}
