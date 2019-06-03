import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from '../../Recipes.model';
import { RecipesSercive } from '../../Recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './Recipe-item.component.html',
  styleUrls: ['./Recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  name: string = 'RecipeItem';

  @Input('receita') recipe: Recipe;

  constructor(private recipeService: RecipesSercive){}

  ngOnInit(){

  }

  onSelectRecipe(){
    this.recipeService.selectedRecipe.emit(this.recipe);
  }
}
