import { Component } from '@angular/core';
import { of, throwError, timer } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrl: './catch-error.component.css',
})
export class CatchErrorComponent {
  loading = false;
  result: string | null = null;
  error: string | null = null;

  makeRequest() {
    this.loading = true;
    this.result = null;
    this.error = null;

    const httpRequest$ = timer(1000).pipe(
      tap(() => console.log('Request started')),
      delay(1000),
      tap(() => {
        if (Math.random() > 0.5) {
          throw new Error('Request failed');
        }
      }),
      catchError((error) => {
        console.error('Request failed:', error);
        return throwError(() => error);
      }),
      retry(3),
      catchError((error) => {
        console.log('Retries exhausted');
        return of('Fallback response');
      }),
      tap((response) => console.log('Final response:', response))
    );

    httpRequest$.subscribe({
      next: (response) => {
        this.result = response as string;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
