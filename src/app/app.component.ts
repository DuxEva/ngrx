import { Component } from '@angular/core';
import { of, from, interval, take, concat, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  numberObservable = of(1, 2, 3, 4, 5);
  colors = ['red', 'blue', 'green', 'yellow'];
  intervalObservable = interval(1000).pipe(take(5));

  constructor() {
    this.numberObservable.subscribe({
      next: (value: number) => console.log(`Emitted value: ${value}`),
      complete: () => console.log('Observable completed!'),
    });

    const colorObservable = from(this.colors);

    colorObservable.subscribe({
      next: (color) => console.log(`Color: ${color}`),
      complete: () => console.log('Color observable completed!'),
    });

    if (this.intervalObservable) {
      this.intervalObservable.subscribe({
        next: (value: any) =>
          console.log(
            `Value: ${value}, Timestamp: ${new Date().toLocaleTimeString()}`
          ),
        complete: () => console.log('Interval observable completed!'),
      });
    }

    const combinedObservable = concat(this.numberObservable, colorObservable);

    combinedObservable.subscribe({
      next: (value) => console.log(`Combined value: ${value}`),
      complete: () => console.log('Combined observable completed!'),
    });

    const errorObservable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.error('Something went wrong!');
      subscriber.next(4);
    });

    errorObservable.subscribe({
      next: (value) => console.log(`Value: ${value}`),
      error: (err) => console.error(`Error occurred: ${err}`),
      complete: () =>
        console.log('This will not be logged since an error occurred.'),
    });
  }
}
