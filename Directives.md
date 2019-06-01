# Directives
São instruções no DOM
1. Attribute directive: muda a aparencia ou comportamento de um elemento do DOM

2. Structural directive: adiciona ou remove um elemento do DOM
**Diretivas estruturais só pode aparecer uma vez por componente**

![Tipos de diretivas]('./tiposDeDiretivas.jpg');


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


## Structural Directives

### Diretives Nativas:

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

## Attribute Directives

### Diretivas Nativas:

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

### Diretivas Customizadas:

#### Jeito Não recomendado
Arquivo baseHighLight.directive.ts:
````
@Directive({
  selector:"[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit{
  constructor(private elem: ElementRef){

  }

  ngOnInit(){
    this.elem.nativeElement.style.backgroundColor = 'yellow'
  }
}
````
#### Jeito recomendado
````
@Directive({
  selector:"[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit{
  constructor(private elem: ElementRef, private renderer: Renderer2){

  }

  ngOnInit(){
    this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'green');
  }
}
````

**Em ambos os casos:**

Adicionar no arquivo app.module.ts:
````
...
@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective
  ],
  imports: [
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
````
**No HTML de Qualquer componente, basta usar o atributo:**
````
<p appBasicHighlight >Estilizado com um diretiva customizada</p>
````
*mais sobre o renderer em : [https://angular.io/api/core/Renderer2](https://angular.io/api/core/Renderer2)*