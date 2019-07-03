# Forms

A 2 manairas de gerenciar um formulário:
1. Template, Template Driven(TD)
2. Reactive

## TD (template driven)
Tenha certeza de que no arquivo `app.modules.ts`, tenhamos importado o `FormsModule`:
````
...
import { FormsModule } from '@angular/forms';
...

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


### Submit e interceptando o Formulário

Vamos definir que esté formulário está em um componente chamado `app.component.ts` e seu template é o `app.component.html`:

````
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
...

</form>    
````
Criamos uma referencia `#form` e definimos igual a `ngForm` que é o objeto de formulário criado automaticamente para este formulário, pelo angular, que é passada no metodo `onSubmit()` 

no `app.component.ts`, criar uma definição do metodo `onSubmit()`:

````
export class AppComponent {

  onSubmit(form){
    console.log(form);
  }
}
````


### Acessando o Form com @ViewChild
o seguinte formulário, usando no exemplo anterior, retirando apena o parâmetro enviado no metodo `onSubmit()`:

````
<form (ngSubmit)="onSubmit()" #form="ngForm">
...

</form>    
````
é possivel capturar o form via decorator `@ViewChild`:

````
export class AppComponent {

  @ViewChild('f', {static: false}) form: NgForm;

  onSubmit(){
    console.log(this.form);
  }
}
````

### Validando
No exemplo abaixo validaremos com as diretivas nativas `required` e `email` 

````
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
...
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
    >
...
</form>    
````
Mais sobre validadores nativos em: [https://angular.io/api/forms/Validators](https://angular.io/api/forms/Validators)

para o meio de Template Drive(TD), mais diretivas que podem ser usadas no template estão marcadas com `D`:
[ https://angular.io/api?type=directive]( https://angular.io/api?type=directive)

#### Usando estado do formulário
O formulário reage dinâmicamente a validadção de cada campo
no caso, podemos impedir o clique do botão enviar o formulário, simplesmente checando se ele é valido ou não usando sua referência, neste caso `#f`:

````
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
...
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
    >
...
  <button 
    [disabled]="!f.valid" 
    class="btn btn-primary" 
    type="submit"
  >Submit</button>
</form>    
````

##### Aproveitando classes nativas do estado do formulário
o formulário gera classes dinâmicas no elemento controlado:
 * .ng-dirty
 * .ng-touched
 * .ng-valid
 * .ng-invalid

##### Mostrando erro de cada campo do form
Usando como exemplo o input de email:
colocar no campo uma referência(`#email`) e 
setar ele igual a `ngModel`, para rastrear o estado do elemento.
assim podemos usar sua referência `#email` para validar outra tag:

````
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
...
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
        #email="ngModel"
    >

    <small
      [ngClass]="{error : email.invalid === true }"
      class="form-text"
      *ngIf="email.invalid && email.touched"
    >Por favor insira um email correto</small>
...
````

##### Mostrando valor padrão no campo do formulário

No template do formulário, adicionar `[]` ao `ngModel`, para que receba as alterações da variavel `defaultSecret`, neste caso do select, este pegará o option com o valor recebibo via variável.

````
<select id="secret"
  class="form-control"
  [ngModel]="defaultSecret"
  name='secret'
>
  <option value="pet">Your first Pet?</option>
  <option value="teacher">Your first teacher?</option>
</select>
````

no arquivo typescript:

````
export class AppComponent {
  defaultSecret = "teacher";
 ...
}
````

##### Usando two way data binding em um campo do formulário
Neste caso temos duas opções, ou definir o atributo `name` no campo
ou adicionar o atributo `[ngModelOptions]="{standalone: true}"`
adicionar `[]` e `()` ao `ngModel`, para que receba('[]') e emita('()') alterações da variavel `responseSecret`.

````
<textarea
  [(ngModel)] = "responseSecret" name="responseSecret">
</textarea>

  OU
<textarea
  [(ngModel)] = "responseSecret" [ngModelOptions]="{standalone: true}">
</textarea>

<p>sua resposta é: {{responseSecret}}</p>
````

##### Usando two way data binding em um grupo de campos
Igual uma validação de uma input, porém para um grupo delas.

colocar no grupo uma referência(`#userData`) e 
setar ele igual a `ngModelGroup`, para rastrear o de todo o grupo.
e uma propriedade `ngModelGroup`  que exportará o nome que definir, vamos supor que `dadosUser`, que será o nome dado ao objeto group

````
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
...
  <div class="form-group" ngModelGroup="dadosUser" #userData="ngModelGroup">
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
        #email="ngModel"
    >

    <small
      [ngClass]="{error : email.invalid === true }"
      class="form-text"
      *ngIf="email.invalid && email.touched"
    >Por favor insira um email correto</small>

  </div>  
  <p class="form-text error" *ngIf="userData.invalid && userData.touched">Dados de usuário invalálidos.</p>
...
````

##### Setando valores do formulario por @ViewChild()
###### Usando método setValue():
No componente:

````
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
...
  <div class="form-group" ngModelGroup="dadosUser" #userData="ngModelGroup">
    <input
      type="text"
      id="username"
      class="form-control"
      ngModel
      name="username"
      required
    >
    <input type="email"
        id="email"
        class="form-control"
        ngModel
        name="email"
        required
        email
        #email="ngModel"
    >
    ...
    demais campos do form...
  </div>  
...
````
no typescript do componente, criar uma variavel para receber o formulário, no caso `userForm`.
usar o metodo `setValue()`, para setar os valores dos campos do formulário.

**NOTA: Com esse método, força a definir um valor para cada campo do formulário**
````
export class AppComponent {
  defaultSecret = "teacher";
  responseSecret = "";
  genders : string[] = ['male', 'female'];
  @ViewChild('f', {static:false}) userForm : NgForm;

  suggestUserName (){
    const suggestedUserName = 'SuperUser';
    this.userForm.setValue({
      dadosUsuario:{
        username: suggestedUserName,
        email: ''
      },
     ...
    })
  }
  ...
}
````

###### Usando o patchValue() da propriedade form (jeito certo):
````
export class AppComponent {
  defaultSecret = "teacher";
  responseSecret = "";
  genders : string[] = ['male', 'female'];
  @ViewChild('f', {static:false}) userForm : NgForm;

  suggestUserName (){
    this.userForm.form.patchValue({
      dadosUsuario:{
        username: suggestedUserName
      }
    });
  }
  ...
}
````

###### pegando valor do campo:
Usando a referência acima de `userForm` para receber os dados do formulário:
pega referência `this.userForm.value.{propriedade}`

Exemplo, pega valor do campo `username` no formgroup `dadosUsuario` e seta variavel `formData`:

`
this.formData.username = this.userForm.value.dadosUsuario.username;
`

###### reseta formulário:
Usando a referência acima de `userForm` para receber os dados do formulário:

`
this.userForm.reset();
`

**NOTA: pode ser passado um objeto como o de setValue passando cada campo do formulário com o valor inicial desejado**