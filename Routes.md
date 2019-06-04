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
## Relative e Absolute Path

### Relative path
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

### Absolute path
É o caminho absoluto desde a página inicial `/`:
exemplo:
Vamos supor que estamos na página `/exemplo`;

````
    <a class="nav-link" routerLink="/servers">Servers</a>
   
````

Ao clicar no botão, ele irá para a path `/servers`