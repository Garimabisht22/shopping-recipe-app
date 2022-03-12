import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState{
  shoppingList : State;
}

export interface State{
  ingredients: Ingredient[],
  editedIngredient:Ingredient,
  editedIngredientIndex : number;
}


const initialState : State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex : -1,
};

export function ShoppingListReducer(
  state : State= initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];  //This is the old  ingredient that is to be updated
      const updatedIngredient = {                                  //This is the new ingredient that is to be added
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];            //This is the all the ingredients old array+newoneIg
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
       return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex : -1,
        editedIngredient : null,
      };


    case ShoppingListActions.DELETE_INGREDIENTS:

      return {
        ...state,
        ingredients: state.ingredients.filter((ig,index)=>{
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex : -1,
        editedIngredient : null,
      };
   case ShoppingListActions.START_EDIT:
     console.log('Printing inside startEDIT')
    //  console.log(action.payload)
    //  console.log({...state.ingredients[action.payload]})
console.log({
  ...state,
  editedIngredientIndex : action.payload,
  editedIngredient : { ...state.ingredients[action.payload]}
});
     return {
       ...state,
       editedIngredientIndex : action.payload,
       editedIngredient : { ...state.ingredients[action.payload]}
     };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex : -1,
        editedIngredient : null,
      };

      default:
      return state;
  }
}
