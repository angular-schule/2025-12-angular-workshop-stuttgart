import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, interval, map, Observable, Observer, of, Subscriber, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-rating');

  constructor() {

    // interval(1000)      // ---0---1---2---3---4---5 ...
    // timer(3000)         // ---------0|
    // timer(3000, 1000)   // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)      // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => console.log(e),
      complete: () => console.log('COMPLETE')
    });



    /*************************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);
      sub.next(30);

      setTimeout(() => sub.next(100), 1000);
      setTimeout(() => sub.next(200), 2000);
      setTimeout(() => sub.next(300), 3000);
      setTimeout(() => sub.complete(), 4000);
    }

    const obs: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('Fertig!')
    }

    // producer(obs);

    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);


    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo');
      sub.next('Welt');
      sub.complete();
    });

    const myObs3$ = of('Hallo', 'Welt');


  }
}
