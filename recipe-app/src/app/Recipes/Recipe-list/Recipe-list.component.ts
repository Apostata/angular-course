import{ Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './Recipe-list.component.html',
  styleUrls:['./Recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  name : string = 'Recipe List';
  constructor() { }

  ngOnInit() {

  }

}
