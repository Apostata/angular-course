# Routes
Emulam uma troca de página.

## Configurando
1. No `app.modules.ts`. Cria um array do tipo Routes passando path e component.
2. Registra o `RouterModule.forRoot({arrayDeRotas})`;

`app.modules.ts`:
````
...
import { Routes, RouterModule } from '@angular/router';
...

const appRoutes: Routes = [
  { path:'', component: HomeComponent },
  { path:'users', component: UserComponent },
  { path:'servers', component: ServersComponent }
];

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

````

3. Inserir o `<router-outlet></router-outlet>` onde desejar renderizar as rotas.
4. Inserir os `routerLink="{rota}"` ao invés do `href="{rota}"`
````
<div class="container">
    <ul class="nav nav-tabs">
        <li role="presentation" class="nav-item">
            <a class="nav-link active" routerLink="/">Home</a>
        </li>
        <li role="presentation" class="nav-item">
            <a class="nav-link" routerLink="/servers">Servers</a>
        </li>
        <li role="presentation" class="nav-item">
            <a class="nav-link" [routerLink]="['/users']">Users</a>
        </li>
    </ul>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
...
````
## Navigation

### routerLink 

#### Relative path
É o caminho referente a página atual:
exemplo:
Vamos supor que estamos na página `/exemplo`;

````
    <a class="nav-link" routerLink="servers">Servers</a>
    ou
    <a class="nav-link" routerLink="./servers">Servers</a>
````

Ao clicar no botão, ele irá para a path `/exemplo/servers`

````
    <a class="nav-link" routerLink="../servers">Servers</a>
````

Ao clicar no botão, ele irá para a path `/servers`.
*`<a class="nav-link" routerLink="../servers">Servers</a>`* irá navegar um nível de volta e acessar a rota `/servers`

#### Absolute path
É o caminho absoluto desde a página inicial `/`:
exemplo:
Vamos supor que estamos na página `/exemplo`;

````
    <a class="nav-link" routerLink="/servers">Servers</a>
   
````

Ao clicar no botão, ele irá para a path `/servers`

#### Marcando com rota ativa
Passa uma determinada classe no style para mostrar como ativa ou não a rota:
1. Necessário colocar a diretiva `routerLinkActive="{nomeDaClasseQuandoAtiva}"`.
2. Para definir que captura exatamente a rota como é:
`[routerLinkActiveOptions] ="{exact:true}"`. Isso é necessário pois todas as rotas contem `/`,
o que manteria todas ativas.

````
...
<li role="presentation" class="nav-item">
    <a class="nav-link"
    routerLinkActive="active"
    [routerLinkActiveOptions] ="{exact:true}"
    routerLink="/"
    >Home
    </a>
</li>
<li role="presentation" class="nav-item">
    <a class="nav-link"
    routerLink="/servers"
    routerLinkActive="active"
    >Servers</a>
</li>
...
````

### Programaticaly

Navegação via código ao invés da interface.
1. Importar o `Router` do `@angular/router`.
2. Registrar no constructor, `private router: Router`.
3. Usar o comando com a variavel criada no constructor `this.router.navigate(['{rota}'])`; 

````
...
import { Router } from '@angular/router';
...

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  ...

  constructor(
    private serversService: ServersService,
    private router: Router
  ) { }

  reloadPage(){
    this.router.navigate(['servers']);
  }
}

````

#### Absolute Path
É o comportamento padrão.

````
this.router.navigate(['servers']);
````

#### Relative Path
1. importar `Router` e `ActivatedRoute` do `@angular/router`.
2. registrar no constructor, `private router: Router` e `private route: ActivateRouter` 
3. usar o comando com as variáveis criada no constructor `this.router.navigate(['{rota}'], {relativeTo: this.route})` 

````
...
import { Router, ActivatedRoute } from '@angular/router';
...

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(
    ...
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ...
  reloadPage(){
    this.router.navigate(['servers'], {relativeTo: this.route})
  }

}

````

## Passing parametrer to router
No `app.modules.ts`:
````
const appRoutes: Routes = [
  { path:'', component: HomeComponent },
  { path:'users', component: UsersComponent },
   { path:'users/:id', component: UserComponent },
  { path:'servers', component: ServersComponent }
];
````
Fazendo com que o parametro `id` seja passado de modo dinâmico via rota. 

então no componente, o qual passará os dados:

````

@Component({
  selector: 'app-component-who-pass',
  templateUrl: './who-pass.component.html',
  styleUrls: ['./who-pass.component.css']
})
export class WhoPassComponent implements OnInit {
 ...

  constructor( private route: Router) { }

  ngOnInit() {
    ...
  }

  ...

  navToUser(){
    let id = 2,
    name= "teste"
    this.route.navigate([`users/${id}/${name}`])
  }
}

````

### Recebendo via Snapshop
````
...

@Component({
  selector: 'app-who-recieve',
  templateUrl: './who-recieve.component.html',
  styleUrls: ['./who-recieve.component.css']
})
export class WhoRecieveComponent implements OnInit {
  ...
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    }
  }
}

````
**Passando dessa forma funciona, porém se você tentar reenviar para este componente, ele não será
atualizado**

### Recebendo via Router params

````
...

@Component({
  selector: 'app-who-recieve',
  templateUrl: './who-recieve.component.html',
  styleUrls: ['./who-recieve.component.css']
})
export class WhoRecieveComponent implements OnInit {
  ...
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subcribe(
      (params: Params)=>{
        this.user.id = params['id'];
        this.users.name = params['name'];
      }
    ) 
  }
}

````

**Desta forma, como o params de route é um Observable('vide Observable.md'), quando evento é emitido para
ele, ele captura e muda o estado, por padrão o angular já irá dar um unsusbcribe quando o componente for destruido ('não estiver ativo'), pois se trata de um comportamento nativo no Router params**

## Passando Query params para uma rota
### Via Template
No arquivo do template que fará a chamada:
````
<a
  [routerLink] = "['/servers', 5, 'edit']"
  [queryParams] ="{allowEdit: 1, anotherParam: true}"
  [fragment]="'Loading'"
  class="list-group-item">
  {{ server.name }}
</a>
````

a url que será passada é: `http://{urlDaAplicacao}/servers/5/edit?oneParam=1&anotherParam=true#Loading`

### Programaticaly
````
@Component({
  ...
})
export class ServersComponent implements OnInit {
  ...
  constructor(
    private router: Router,
  ) { }

  ...

  loadServer(id: number){
    this.router.navigate([`/servers/${id}/edit`], {
      queryParams:{oneParam: 1, anotherParam: true},
      fragment:'Loading'
    })
  }
}

````

## Nested Routes
Mudar o `app.modules.ts(ou onde estiver o array de rotas)`:
````
const appRoutes: Routes = [
  { path:'', component: HomeComponent },
  { path:'users', component: UsersComponent, children:[
    { path:':id/:name', component: UserComponent }
  ]},
  { path:'servers', component: ServersComponent, children:[
    { path:':id', component: ServerComponent},
    { path:':id/edit', component: EditServerComponent}
  ]},
];
````
Como exemplo do caso acima, nos componentes pais, `UsersComponent` e `ServersComponent`
colocar um segundo `<router-outlet></router-outlet>` o qual renderizará as páginas filhas.

### Passing queryParams to child routes

Para navegar para uma página filha passando parametros recebidos pela página pai,

neste exemplo navega da rota `/servers/:id` passando parametros recebidos para `/servers/:id/edit`.

````
editServer(){
  this.router.navigate(['edit'],{ relativeTo:this.activeRoute, queryParamsHandling:'preserve'})
}

````

## Trantando páginas desconhecidas:
Mudar o `app.modules.ts` ou onde estiver array de rotas.

````
const appRoutes: Routes = [
  { path:'', component: HomeComponent, pathMatch: 'full' },
  { path:'users', component: UsersComponent, children:[
    { path:':id/:name', component: UserComponent }
  ]},
  { path:'servers', component: ServersComponent, children:[
    { path:':id', component: ServerComponent},
    { path:':id/edit', component: EditServerComponent}
  ]},
  {path: 'not-found', component: PageNotFoundComponent },
  {path: '**', redirectTo:'/not-found' }
];
````

**IMPORTANTE: Este wildcard deve ser usado como ultima rota do array de rotas. Pois não reconhecerá as rotas que estiverem abaixo dele, trantando como match no wildcard**

### Tratando path inteira

````
const appRoutes: Routes = [
 ...
  {path: '', redirectTo:'/not-found', pathMatch: 'full'  }
];
````

Somente será redirect, if the path is ''  (então somente se NÃO tiver outra conteúdo diferente de '').