import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from 'protractor';
import { ShoppingListSercive } from './Shopping-list.service';
import { RecipesSercive } from '../Recipes/Recipes.service';

@Component({
  selector: "app-shopping-list",
  templateUrl: './Shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit{

  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingListSercive, private recipeService: RecipesSercive){}

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();

    this.shoppingService.ingredientAdded.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
  }
}
