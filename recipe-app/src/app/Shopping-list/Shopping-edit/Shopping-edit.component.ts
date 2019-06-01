import { Component, OnInit, Input, ViewChild ,ElementRef, EventEmitter, Output} from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  name: string = 'ShoppingListEdit';
  // @ViewChild('nameInput'/*,{ static: false } no angular 8*/) inputName : ElementRef;
  // @ViewChild('amountInput'/*,{ static: false } no angular 8*/) inputAmount : ElementRef;
  @Output() ingredientAdded :EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(ingredientName:string, ingredientAmount:number):void{
    // const ingredientName = this.inputName.nativeElement.value;
    // const ingredientAmount = this.inputAmount.nativeElement.value;
    const newIngredient: Ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientAdded.emit(newIngredient);
  }

}
