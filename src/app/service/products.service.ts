import { Injectable } from '@angular/core';
import { Product } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.URL).pipe(
      tap(() => {
        if (Math.random() > 0.5) {
          throw new Error('Request failed');
        }
      }),
      retry(2),
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
