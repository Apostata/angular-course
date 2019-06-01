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

ou

<ng-template [ngIf]="serverCreated">
    <p> Name is {{serverName}}</p>
</ng-template>
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

### ngSwitch (estrutural)
````
<div [ngSwitch]="propriedade">
    <p *ngSwitchCase="1" >Propriedade = 1</p>
    <p *ngSwitchCase="5" >Propriedade = 5</p>
    <p *ngSwitchCase="10" >Propriedade = 10</p>
    <p *ngSwitchDefault >Propriedade = outra coisa</p>
</div>
````

### Diretivas Customizadas
````
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean){ // um setter é executado sempre que a propriedade muda
    if(!condition){
      this.viewRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewRef.clear()
    }
  } 
  constructor(private templateRef:TemplateRef<any>, private viewRef: ViewContainerRef) { }

}
````

No template
````
<div *appUnless="propriedade">
    ...mostra algo quando propriedade é falsa
</div>
````

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

#### Diretivas Reativas (@HostListener(evento)):
Muda o comportamento do DOM quando algum evento ocorre. 
neste caso:
1. quando passa o mouse em cima do elemento, ele ficará com a cor azul.
2. quando retirar o mouse do elemento, ele voltará a ter uma cor de fundo transparente.

````
@Directive({
  selector:"[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elem: ElementRef, private renderer: Renderer2){
    }

    @HostListener('mouseenter') onMouseOver(event: Event){
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'blue');
    }
    @HostListener('mouseleave') onMouseOut(event: Event){
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'transparent');
    }

}
````

#### Usando @HostListener e @HostBinding (jeito fácil, simples e elegante):

````
@Directive({
  selector:"[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit{
    @HostBinding('style.backgroundColor') bgProp: string = 'transparent';
    
    @HostListener('mouseenter') onMouseOver(event: Event){
        this.bgProp = 'blue';
    }
    @HostListener('mouseleave') onMouseOut(event: Event){
        this.bgProp = 'transparent';
    }
}
````

#### Binding Directive to Property
Unindo diretivas as propriedades:
código typescript:
````
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor:string;
  @Input() highlightColor:string;

  @HostBinding('style.backgroundColor') bgProp: string;

  ngOnInit(){
    this.bgProp = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseOver(event: Event){
    this.bgProp = this.highlightColor;
  }
  @HostListener('mouseleave') onMouseOut(event: Event){
    this.bgProp = this.defaultColor;
  }
}
````

Template HTML
````
<p appBetterHighlight [defaultColor]="'grey'" [highlightColor]="'yellow'">diretiva customizada</p>
````
Por conta dos valores passados serem strings, podem ser escritos da seguinte forma:
````
<p appBetterHighlight defaultColor="grey" highlightColor="yellow" >diretiva customizada</p>
````

Caso, no arquivo do typeScritp o nome da propriedade tenha o mesmo alias do que o seletor da própria
diretiva:
````
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input('appBetterHighlight') highlightColor:string;

  ...
}
````
pode ser feito dessa forma:

````
<p [appBetterHighlight]="'yellow'" defaultColor="grey" >diretiva customizada</p>
````
