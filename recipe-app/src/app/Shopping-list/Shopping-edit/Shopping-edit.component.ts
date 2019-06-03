import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListSercive } from '../Shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{
  constructor(private shoppingService: ShoppingListSercive) { }

  onAddItem(name:string, amount:number){
    let ingredient = new Ingredient(name, amount);
    this.shoppingService.addIngredient(ingredient);
  }

}
