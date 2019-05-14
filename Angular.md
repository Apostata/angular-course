# Angular 2+

## Estrutura e arquitetura
O padrão de criação de componente do Angular é o seguinte:
1. pasta com o nome do compoenente:
    {nomeComponente}.component.html
    {nomeComponente}.component.ts
    {nomeComponente}.component.css

## AppModules
Oarquivo `app.modules.ts`, é o arquivo onde estarão os componentes a serem usados no projeto e os
módulos de terceiros:
````
@NgModule({
  declarations: [ //Modulos declarados para serem usados
    AppComponent,
    ServerComponent
  ],
  imports: [ // bibliotecas e plugins uteis
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente inicial
})
````
## Componentes

### Criando componentes pela CLI
ng generate component {nomeDoComponente} ou
ng g c {nomeDoComponente}

### Anatomia do Componente

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
### Component selector types:

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


### Binding events
Muito similar as propriedades o que muda é que ao invés de colchetes '[]', usará parenteses '()' `(evento)="metodoTs"` -> `<button (click)="onCreateServer()" >Add Server</button>`

### Two way data binding:

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

## Directives
São instruções no DOM

Normalmente utilizadas como type de seletor de atributo, Ex: `<p diretiva >Algum texto</p>` 

TS:
````
@Directive({
  selector: [diretiva]
})

export class ClasseDaDiretiva{
  ...
}
````
### Diretives Nativas:
1. Attribut directive: muda a aparencia ou comportamento de um elemento do DOM
2. Structural directive: adiciona ou remove um elemento do DOM

#### ngIf (estrutural)
verfifica a condição e adiciona ou remove o DOM
````
<p *ngIf="serverCreated"> Name is {{serverName}}</p>
````

#### else (estrutural)
````
<p *ngIf="serverCreated; else noServer"> Name is {{serverName}}</p>

<ng-template #noServer>
  <p>No server was Created!</p>
</ng-template>

````

#### ngFor (estrutural)
Itera no array passado renderizando o componente definido
Exemplo: 

````
<app-server *ngFor="let server of servers"></app-server>
````
**Itera no array servers e para cada item do array renderiza app-server**


#### ngStyle (atributo)
````
  <p [ngStyle]="{backgroundColor: getColor()}">
   Servidor {{serverId}} is {{getServerStatus()}}
  </p>
````

#### ngClass (atributo)
````
<p
  [ngStyle]="{backgroundColor: getColor()}"
  [ngClass]="{online : serverStatus === 'online'}"
>Servidor {{serverId}} is {{getServerStatus()}}</p>
````