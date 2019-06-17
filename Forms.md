# Forms

A 2 manairas de gerenciar um formulário:
1. Template, Template Driven(TD)
2. Reactive

## TD (template driven)
Tenha certeza de que no arquivo `app.modules.ts`, tenhamos importado o `FormsModule`:
````
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

````

para registrar no template quais campos serão registrados para controle do formulário exemplo do template:
````
<form>
...
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
    >
...
</form>    
````

um exemplo de input com registro de validação do formulário, neste caso deve inserir o attributo `ngModel` e o atributo `name={nomeDesejado}`,
Desta forma, está variavel já é registrada no formulário


## Submit e interceptando o Formulário

Vamos definir que esté formulário está em um componente chamado `app.component.ts` e seu template é o `app.component.html`:

````
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
...

</form>    
````
Criamos uma referencia `#form` e definimos igual a `ngForm` que é o objeto de formulário criado automaticamente para este formulário, pelo angular, que é passada no metodo `onSubmit()` 

no `app.component.ts`, criar uma definição do metodo `onSubmit()`:
