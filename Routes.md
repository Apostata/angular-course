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