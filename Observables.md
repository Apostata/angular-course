# Observables
Quando um fluxo de emissão e recepção de dados é criado.

## Observable (emiter)
Quando um evento é disparado.

## OBserver (subscriber)
Quando um evento dispatado é capturado

1. Gerencia Dados
2. Gerencia Erros
3. Gerencia o Término do envento

## Usando o unsubscribe

Exemplo em `home.component.ts`.
````
import { interval, Subscription } from 'rxjs';

export class HomeComponent implements OnInit, OnDestroy {
  private intervalo : Subscription;

  constructor() { }

  ngOnInit() {
    this.intervalo = interval(1000).subscribe((count: Number) =>{
      console.log(count);
    });
  }

  ngOnDestroy(){
    this.intervalo.unsubscribe();
  }
}
````
Quando não é um Observable nativo, como o de params ou queryParams, é necessário executar o *unsubscribe* para que não haja uso desnecessário da memória e lentidão. No quando deixar o componente, ele irá parar de escutar a inscrição da propriedade intervalo, usando o metodo `unsubscribre()`

## Criando um Observable customizado
No callback de `Observable.create(observer=>{...})`, é possível verificar os 3 hooks:
1. observer.next();
2. observer.error();
3. observer.complete();

Exemplo em `home.component.ts`.

### Emitindo dados normalmente

````
export class HomeComponent implements OnInit, OnDestroy {
  private customIntervalObservable : Subscription;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create( observer => {
      let count: number = 0;
      setInterval(()=> {
        observer.next(count);
        count++;
      },1000 )
    });

    this.customIntervalObservable = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy(){
    this.customIntervalObservable.unsubscribe();
  }
}
````

### Emitindo Errors
Usando o mesmo exemplo anteriror:

````
...
ngOnInit() {
    const customIntervalObservable = Observable.create( observer => {
      let count: number = 0;
      setInterval(()=> {
        observer.next(count);
        if(count > 3){
          observer.error(new Error('count maior que 3'));
        }
        count++;
      },1000 )
    });

    this.customIntervalObservable = customIntervalObservable.subscribe(
      data => { // sucesso
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  ...
````

**Quando o erro é gerado, a automáticamente o subscribe encerra(unsubscribe)**
No subscribe do observable o segunda função é a que gerencia o que acontece quando um erro ocorre.

### Emitindo Completed
Usando o mesmo exemplo anteriror:

````
...
ngOnInit() {
    const customIntervalObservable = Observable.create( observer => {
      let count: number = 0;
      setInterval(()=> {
        observer.next(count);
         if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('count maior que 3'));
        }
        count++;
      },1000 )
    });

    this.customIntervalObservable = customIntervalObservable.subscribe(
      data => { // sucesso
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    );
  }
  ...
````

**Quando o complete é gerado, a automáticamente o subscribe encerra(unsubscribe)**
No subscribe do observable a terceira função é a que gerencia o que acontece quando um evento complete é emitido pelo observable.

## Operators
O dados são transformados antes mesmo dos eventos começarem a escutar os eventos.


Usando o mesmo exemplo anteriror:

````
...
ngOnInit() {
  let customObservablePipe;
  const customIntervalObservable = Observable.create( observer => {
    let count: number = 0;
    setInterval(()=> {
      observer.next(count);
        if(count === 2){
        observer.complete();
      }
      if(count > 3){
        observer.error(new Error('count maior que 3'));
      }
      count++;
    },1000 )
  });

  customObservablePipe = customObservable.pipe(
    map(data => {
      let retDada = Number(data) + 1;
      return `Round ${retDada}`;
    })
  );

  this.customIntervalObservable = customObservablePipe.subscribe(
    data => { ///sucesso
      console.log(data);
    },
    error => {
      console.log(error);
    },
    () => {
      console.log('Completed');
    }
  );
}
  ...
````

Usando o metodo `pipe()` é um interceptador para que um **Operator** atue.
Podem ser usados mais de um pipe, adicionando cada pipe apos uma virgula:
````
customObservablePipe = customObservable.pipe(
  filter(data =>{
    return data > 0;
  }),

  map(data => {
    let retDada = Number(data) + 1;
    return `Round ${retDada}`;
  })
);
````

**[Lista de operators em: https://www.learnrxjs.io/operators/](https://www.learnrxjs.io/operators/)**

## Subjects