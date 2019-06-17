import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListSercive{

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>()
  getIngredients(){
    return this.ingredients.slice();
  }
  setIngredients(ingredients:Ingredient[]){
    this.ingredients = ingredients;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    for(let i in ingredients){
      this.ingredients.push(ingredients[i]);
    }
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
