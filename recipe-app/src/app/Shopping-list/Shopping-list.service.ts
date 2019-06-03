import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

export class ShoppingListSercive{

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>()
  getIngredients(){
    return this.ingredients.slice();
  }
  setIngredients(ingredients:Ingredient[]){
    this.ingredients = ingredients;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    for(let i in ingredients){
      this.ingredients.push(ingredients[i]);
    }
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
