import { Injectable} from '@angular/core';
import { Recipe } from './Recipes.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListSercive } from '../Shopping-list/Shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesSercive {
  selectedRecipe: Subject<Recipe> = new Subject<Recipe>();
  ingredientSended: Subject<Ingredient[]> = new Subject<Ingredient[]>()
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'Simples teste de receita um',
      'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg',
      [
        new Ingredient('Tomate', 2),
        new Ingredient('Alho', 1)
      ]
    ),
    new Recipe(
      'Test Recipe 2',
      'Simples teste de receita dois',
      'https://www.tasteofhome.com/wp-content/uploads/0001/01/Chipotle-Berry-Fruit-Salsa_EXPS_SDJJ19_94282_B02_12_7b-696x696.jpg',
      [
        new Ingredient('Cebolas', 1),
        new Ingredient('Alho', 1)
      ]
    )
  ];

  constructor(private shoppingListService : ShoppingListSercive){}

  getRecipes(){
    return this.recipes.slice(); //um gato para retornar uma cópia do array
  }

  sendIngredients(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(idx:number){
    const recipes = this.recipes.slice();
    return recipes[idx];
  }
}
