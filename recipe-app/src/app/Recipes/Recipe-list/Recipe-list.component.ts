import{ Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './Recipe-list.component.html',
  styleUrls:['./Recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  name : string = 'Recipe List';
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Simples teste de receita', 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg'),
    new Recipe('Test Recipe', 'Simples teste de receita', 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg')
  ];
  constructor() { }

  ngOnInit() {

  }

}
