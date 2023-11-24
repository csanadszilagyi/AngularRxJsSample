import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResourceService {
  private readonly products$: Observable<Product[]> = of([
    {
      name: 'Kóla',
      category: ProductCategory.Drink,
      price: 200,
    },
    {
      name: 'Fanta',
      category: ProductCategory.Drink,
      price: 340,
    },
    {
      name: 'Sprite',
      category: ProductCategory.Drink,
      price: 670,
    },
    {
      name: 'Pizza',
      category: ProductCategory.Meal,
      price: 3500,
    },
    {
      name: 'Kinley',
      category: ProductCategory.Drink,
      price: 1699,
    },
    {
      name: 'Víz',
      category: ProductCategory.Drink,
      price: 2000,
    },
    {
      name: 'Hamburger',
      category: ProductCategory.Meal,
      price: 4000,
    },
    {
      name: 'Torta',
      category: ProductCategory.Meal,
      price: 8000,
    },
    {
      name: 'Bableves',
      category: ProductCategory.Soup,
      price: 1100,
    },
    {
      name: 'Húsleves',
      category: ProductCategory.Soup,
      price: 1350,
    },
    {
      name: 'Halászlé',
      category: ProductCategory.Soup,
      price: 1200,
    },
    {
      name: 'Gyümölcsleves',
      category: ProductCategory.Soup,
      price: 800,
    },
  ]);

  constructor() {}

  public getProducts(): Observable<Product[]> {
    return this.products$;
  }
}
