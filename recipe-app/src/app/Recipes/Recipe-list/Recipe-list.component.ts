import{ Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../Recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './Recipe-list.component.html',
  styleUrls:['./Recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  name : string = 'Recipe List';
  singleRecipe: Recipe;
  @Output() selectedSingle: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Simples teste de receita um', 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg'),
    new Recipe('Test Recipe 2', 'Simples teste de receita dois', 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg')
  ];
  constructor() { }

  ngOnInit() {

  }

  onSelected(recipe:Recipe){
    this.selectedSingle.emit(recipe);
  }

}
