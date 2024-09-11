import { Component } from '@angular/core';
import { of, throwError, timer } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrl: './catch-error.component.css',
})
export class CatchErrorComponent {
  loading = false;
  result: Product[] | null = null;
  error: string | null = null;

  constructor(private productService: ProductsService) {}

  makeRequest() {
    this.loading = true;
    this.result = null;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.result = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });

    // const httpRequest$ = timer(1000).pipe(
    //   tap(() => console.log('Request started')),
    //   delay(1000),
    //   tap(() => {
    //     const random = Math.random();
    //     console.log('Random value:', random);
    //     if (random > 0.5) {
    //       throw new Error('Request failed');
    //     }
    //     return random;
    //   }),
    //   retry(2),
    //   catchError((error) => {
    //     console.error('Request failed:', error);
    //     this.error = 'Retries exhausted';
    //     return of('Fallback response');
    //   }),
    //   tap((response) => console.log('Final response:', response))
    // );

    // httpRequest$.subscribe({
    //   next: (response) => {
    //     this.result = 'Request successful';
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = err.message;
    //     this.loading = false;
    //   },
    // });
  }
}
