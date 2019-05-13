# Angular 2+

## Componentes
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


## Binding properties
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
