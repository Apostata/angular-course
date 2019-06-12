import { RecipeStartComponent } from './Recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './Recipes/Recipes.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './Shopping-list/Shopping-list.component';
import { RecipeListComponent } from "./Recipes/Recipe-list/Recipe-list.component";
import { RecipeDetailsComponent } from './Recipes/Recipe-details/Recipe-details.component';

const routes = [
  { path: 'recipes', component: RecipesComponent, children:[
    {path: '', component: RecipeStartComponent, pathMatch:'full' },
    {path: ':idx', component: RecipeDetailsComponent }
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
