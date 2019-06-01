import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from 'protractor';

@Component({
  selector: "app-shopping-list",
  templateUrl: './Shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredient: Ingredient;

  constructor(){
  }

  ngOnInit(){

  }

  onAddedIngredient(ingredient: Ingredient){
    console.log(ingredient);
    this.ingredients.push(ingredient);
  }

  selectIngredient(ingred: Ingredient): void {
    this.ingredient = ingred;
  }
}
