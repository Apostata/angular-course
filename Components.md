# Componentes

## Criando componentes pela CLI
ng generate component {nomeDoComponente} ou
ng g c {nomeDoComponente}

## Anatomia do Componente

````
import { Component } from '@angular/core';

@Component({                                // Decorator
  selector: 'app-root',                     // obrigatório -Nome da Tag de html
  templateUrl: './app.component.html',      // obrigatório - Template que será renderizado, arquivo externo.
  //template: `<p>Inline template</p>`,     // obrigatório - Template que será renderizado, inline HTML.
  styleUrls: ['./app.component.css']        // opcional - estilos que serão utilizados, arquivos externos.
  //styles: [`
  //  h3{
  //      color: blue;                      // opcional - estilos que serão utilizados, inline CSS.
  //  }
  //`]
})
export class AppComponent {                 // classe do componente
  name = 'My App';                          // Propriedadde do componente, que será passada para o HTML,
}                                           // possivelmente    

````
## Component selector types:

````
@Component({                                
  selector: '{type}',
  ...
})
````
onde type pode ser:
1.  selector: `'app-root'`-> uma tag HTML de nome app-root: `<app-root></app-root>`. (Padrão para componentes)
2.  selector: `'[app-root]'`-> uma tag com atributo app-root: `<div app-root></div>`.
3.  selector: `'.app-root'`-> uma tag com class app-root: `<div class="app-root"></div>`.


## Data Binding

### Binding properties
`servers.ts`
````
export class ServersComponent implements OnInit {
  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = !this.allowNewServer;
    }, 1500);
  }

  ...
}
````
`servers.html`
````
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
````
** Desta maneira o colchetes linka o attributo HTML 'disabled' com a propriedade da classe 'allowNewServer'.
qualquer mudança feita nesta propriedade, irá refletir automáticamente no HTML **

*Resumindo: no html basta colocar a propriedade html e ligá-la a propriedade do typeScript usando os colchetes'[]' `[propriedadeHTML] = "propriedadeTS"`-> `<button [disabled]="!allowNewServer">Add Server</button>` *


## Binding events
Muito similar as propriedades o que muda é que ao invés de colchetes '[]', usará parenteses '()' `(evento)="metodoTs"` -> `<button (click)="onCreateServer()" >Add Server</button>`

## Two way data binding:

Para que o funcione, é necessário importar o `{ FormsModule }` from `@angular/forms` e adiciona-lo no arquivo `app.modules.ts`
Ex:
````
@NgModule({
  ...
  imports: [ // bibliotecas e plugins uteis
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
 ...
})
````

no template:
`[(ngModel)]="{nomeDaPropriedade}"`; onde a propriedade 'nomeDaPropriedade' aceitará funcionará como
um evento e ao mesmo tempo como alvo da renderização com a propriedade de mesmo nome no arquivo Type Script. 

### Recieving data on child component
 Para deixa-las acessíveis aos compoenentes pais, é necessário adicionar um decorator:

Parent component HTML:
````
<div class="row">
      <div class="col-xs-12">
        <app-server-element
        *ngFor="let serverElement of serverElements"
        [element]="serverElement">

        </app-server-element>
      </div>
  </div>
````

Child Component Type Script:
````
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})

export class ServerElementComponent implements OnInit {

  @Input() element:{
    type: string,
    name: string,
    content: string
  }
 ...
}

````

Passa para o atributo `element` do component `app-server-element` com o valor de `serverElement`. linkando assim a propriedade do componente pai com o filho.

#### Passing with alias
é possivel passar um apelido para o elemento, no caso, se não quiser que o nome no HTML do componente pai seja `element`, é possivel mudar:

Child Component Type Script:
````
export class ServerElementComponent implements OnInit {

  @Input('srvElement') element:{...}
}
````

Parent component HTML:
````
...
  <app-server-element
  *ngFor="let serverElement of serverElements"
  [srvElement]="serverElement">
...
````

### Passing events with data to parent component

para retornar valores aos componentes pais:

Parent component HTML:
````
<div class="container">
  <app-cockpit
    (addServer)="onServerAdded($event)">
  </app-cockpit>
</div>
````

Parent component Type Script
````
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverElements = [
    {type:'server', name:'testServer', content:'just a teste'}
  ];

  onServerAdded(serverData:{ serverName:string, serverContent:string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
}
````

Child component HTML:
````
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
      class="btn btn-primary"
      (click)="addServer()">Add Server
    </button>
</div>

````

Child component Type Script:
````
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName ='';
  newServerContent ='';

  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  ...

  addServer() {
    this.serverCreated.emit(
      {
        serverName: this.newServerName,
        serverContent: this.newServerContent
      }
    );
  }
}

````
#### Passing with alias
é possivel passar um apelido para o evento no component pai

Child Component Type Script:
````
export class ServerElementComponent implements OnInit {

  @Output('svCreated') serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
}
````

Parent component HTML:
````
...
<app-cockpit
  (svCreated)="onServerAdded($event)">
</app-cockpit>
...
````

### Acessando o DOM com Local References e @ViewChild() (não muito legal de usar por questões de segurança)

#### Local Reference
É possivel criar uma referencia do DOM, no template HTML que estará acessível em qualquer parte do template, podendo ser passado para o Type Script:
````
<input type="text" class="form-control" #serverNameInput>
{{serverNameInput.value}}

<button
  class="btn btn-primary"
  (click)="onAddServer(serverNameInput.value)">Add Server
</button>
````
para criar a referência, é usado o `#{nome desejado}`. Exemplo mostrando como String Interpolation `{{node da referencia.value}}`. como se trada de um HTML. é necessário passar apenas string : *.value*
ou passando com parametro para um evento

#### @ViewChild()
Assim coma a `Local Reference` é possivel acessar o DOM, mas desta forma é diretamente do Type Script, a sintaxe do HTML é a mesma:

````
<input type="text" class="form-control" #serverNameInput>
````

já no Type Script:
````

import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


export class CockpitComponent implements OnInit {
 
  @ViewChild('serverNameInput') inputContent : ElementRef
  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput:string) {
    this.serverCreated.emit(
      {
        serverName: nameInput,
        serverContent: this.inputContent.nativeElement.value
      }
    );
  }
}
````
Desta forma em `@ViewChild('nome da referência')`, acessa o DOM com um Wrapper chamado nativeElement



### Passando Conteudo HTML para outro componente
Bom para reusabilidade de código.

Parent element HTML:
````
<app-server-element
*ngFor="let serverElement of serverElements"
[srvElement]="serverElement">
  <p>
    <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
    <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
  </p>
</app-server-element>
````

Child element HTML:
````
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">

    <ng-content></ng-content>

  </div>
</div>
````

Desta forma, passa o HTML no Componente pai, e usando `<ng-content></ng-content>` no componente filho para dizer onde será renderizado o HTML  recebido. 
