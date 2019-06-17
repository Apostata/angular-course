import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListSercive } from './Shopping-list.service';
import { RecipesSercive } from '../Recipes/Recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-shopping-list",
  templateUrl: './Shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  private ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;

  constructor(private shoppingService: ShoppingListSercive){}

  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();

    this.ingredientsSubscription = this.shoppingService.ingredientAdded.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.ingredientsSubscription.unsubscribe();
  }
}
