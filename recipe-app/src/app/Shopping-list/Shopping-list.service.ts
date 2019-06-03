import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable()

export class ShoppingListSercive{

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>()

  getIngredients(){
    return this.ingredients;
  }
  setIngredients(ingredients:Ingredient[]){
    this.ingredients = ingredients;
  }

  addIngredient(name:string, amount:number){
    const ingred = new Ingredient(name, amount)
    this.ingredients.push(ingred);
    this.ingredientAdded.emit(this.ingredients.slice())
  }
}
