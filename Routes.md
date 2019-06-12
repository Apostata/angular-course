# Routes
Emulam uma troca de página.

## Configurando
### Meio fácil, porém não segue melhores práticas
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


### Meio Correto

Criar aruivo `app.routes.ts`:
````
import { Routes, RouterModule } from "@angular/router";

const appRoutes = [
  ...rotas
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutesModule {}
````

No aruivo `app.modules.ts`:
````
import { AppRoutesModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
No `app.routes.ts`:
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
Mudar o `app.routes.ts(ou onde estiver o array de rotas)`:
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
Mudar o `app.routes.ts` ou onde estiver array de rotas.

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

## Protegendo Rotas (Guards)
Criar um serviço para proteção da rota. Neste exemplo utilizaremos o `auth-guard.service.ts`
este serviço usa outro para que possa validar se a rota está protejida ou não.
neste exemplo ele verifica se o retorno do método `isAuthenticated` do serviço `AuthService` retorna `true`(autenticado) ou `false`(não autenticado).

inserir os serviços no arquivo `app.module.ts`:
````
@NgModule({
  declarations: [
   ...
  ],
  imports: [
    ...
  ],
  providers: [
    ...
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
````

### Protegendo uma única rota

 ````
 @Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
      return this.authService.isAuthenticated().then(
        (auth: boolean)=>{
          if(auth){
            return true;
          }

          this.router.navigate(['/']);
          return false;
      }
    )
  }
}
 ````

 no arquivo de rotas `app.routes.ts`, modificar a rota com o atributo `canActivate`, passando como parâmetro um array da classe criada para o guard, no caso `AuthGuard`:

 ````
 ...
 const appRoutes:  Routes = [
  { path:'', component: HomeComponent },
  { path:'users', component: UsersComponent, children:[
    { path:':id/:name', component: UserComponent }
  ]},
  { path:'servers',
    canActivate:[AuthGuard],
    component: ServersComponent,
    children:[
      { path:':id', component: ServerComponent},
      { path:':id/edit', component: EditServerComponent}
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent },
  {path: '**', redirectTo:'/not-found' }
];
...
 ````

 ### Protejendo rotas filhas
 ````
 @Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated().then(
        (auth: boolean)=>{
          if(auth){
            return true;
          }

          this.router.navigate(['/']);
          return false;
      }
    )
  }

  canActivateChild( route: ActivatedRouteSnapshot, state:RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean  {
    return this.canActivate(route, state);
  }
}
 ````

 no arquivo de rotas `app.routes.ts`, modificar a rota que protegerá as filhas com o atributo `canActivateChild`, passando como parâmetro um array da classe criada para o guard, no caso `AuthGuard`:

 ````
 ...
 const appRoutes:  Routes = [
  { path:'', component: HomeComponent },
  { path:'users', component: UsersComponent, children:[
    { path:':id/:name', component: UserComponent }
  ]},
  { path:'servers',
    canActivateChild:[AuthGuard],
    component: ServersComponent,
    children:[
      { path:':id', component: ServerComponent},
      { path:':id/edit', component: EditServerComponent}
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent },
  {path: '**', redirectTo:'/not-found' }
];
...
````

### Proibindo abandodo da rota (canDeactivate)

Serve para, por exemplo, probibir usuário de deixar a rota caso haja alterações não salvas.

Criar um servico para isso, no caso `can-deactivate-gard.service.ts`

````
import { Observable } from "rxjs/Observable";
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
  canDectivate: () => Observable<boolean> | Promise<boolean> | boolean
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate (
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDectivate(); // metodo da interface criada acima
  }
}
````

no arquivo `app.routes.ts`, inserir o atributo `canDeactivate`, passando como parametro um array com o a classe do guard, no caso `CanDeactivateGuard`:
````
{ path:'servers',
    canActivateChild:[AuthGuard],
    component: ServersComponent,
    children:[
      { path:':id', component: ServerComponent},
      { path:':id/edit',
        canDeactivate:[CanDeactivateGuard],
        component: EditServerComponent
      }
    ]
  },
````

no componente que terá a restrição de rota, no caso `edit-server.components.ts`, implementar a interface criada, no caso `CanComponentDeactivate`, que obriga a implementação do método `canDeactivate`:

````
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  name: string;
  status: string;
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activeRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    ...
  }

  onUpdateServer() {
    ...
  }

  canDectivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    if((this.name !== this.server.name || this.status !== this.server.status) && !this.changesSaved){
      return confirm('Você deseja descartar as mudanças Realizadas?');
    }
    else{
      return true;
    }
  }
}

````

## Resolver
É um interceptador de rotas, que pode inicializar um componente, chamando um serviço, quando houver uma mudança de rotas.
exemplo de resolver, `server-resolver.service.ts`. Como é um serviço que chamará outro, é necessário usar o decorator @Injectable():

O metodo `getServer(id)`é chamado do serviço `ServersService` passando como parametro o `id` passado via params da rota. Exemplo de rota: `servers/:id`

````
@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService){}

  resolve(activateRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(Number(activateRoute.params.id));
  }
}
````

no `app.routes.ts`:
````
const appRoutes:  Routes = [
  ...
  { path:':id', component: ServerComponent, resolve:{server:ServerResolver}},
  ...
];

````

no component `ServerComponent`:
````
...
ngOnInit() {
  this.activeRoute.data.subscribe((data:Data)=>{
    console.log(data);
    this.server = data['server'];
  });
}
...
````

## Routes in very old Browsers

No arquivo `app.routes.ts`, usar `{useHash: true}`;
fazendo com que uma url, por exemplo : `{domínio}/servers/:id` 
vire `{domínio}/#/servers/:id`.
o backend só se importa com o que está de fato antes do hash.
````
...
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes, useHash: true)
  ],
  exports:[
    RouterModule
  ]
})
````