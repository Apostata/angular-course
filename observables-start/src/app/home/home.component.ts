import { Data } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private customIntervalObservable : Subscription;

  constructor() { }

  ngOnInit() {
    let customObservablePipe;
    const customObservable = Observable.create( observer => {
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
      filter(data =>{
        return data > 0;
      }),
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

  ngOnDestroy(){
    this.customIntervalObservable.unsubscribe();
  }
}
