import { RecipeStartComponent } from './Recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './Recipes/Recipes.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './Shopping-list/Shopping-list.component';
import { RecipeDetailsComponent } from './Recipes/Recipe-details/Recipe-details.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';

const routes = [
  { path: 'recipes', component: RecipesComponent, children:[
    {path: '', component: RecipeStartComponent, pathMatch:'full' },
    {path: 'new', component: RecipeEditComponent },
    {path: ':idx', component: RecipeDetailsComponent },
    {path: ':idx/edit', component: RecipeEditComponent }
  ]},
  { path: 'shoppinglist', component: ShoppingListComponent },
  { path: '', redirectTo:'recipes',  pathMatch: 'full' }
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutesModule {

}
