import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "app-header",
  templateUrl: './Header.component.html'
})
export class HeaderComponent{
  name: string = 'header';
  @Output() rotaSelecionada: EventEmitter<string> = new EventEmitter<string>();

  onSelect(rota:string){
    this.rotaSelecionada.emit(rota);
  }
}
