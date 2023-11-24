import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  filter,
  from,
  map,
  mergeAll,
  switchAll,
  scan,
  switchMap,
  toArray,
  defaultIfEmpty,
  startWith,
  of,
  EMPTY,
} from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private cartStateSource$ = new BehaviorSubject<Cart>({
    selectedProducts: [],
    // sumPrice: 0,
  });

  public cart$ = this.cartStateSource$.asObservable();

  public cartTotalCost$ = this.cart$.pipe(
    map((cart) =>
      cart.selectedProducts.reduce((prev, curr) => prev + curr.price, 0)
    )
  );

  public numProductsInCart$ = this.cart$.pipe(
    map((cart) => cart.selectedProducts.length)
  );

  // ha 3-nál több terméket vesz -> ingyenes kiszállítás van
  public hasFreeShipping$ = this.cart$.pipe(
    map((cart) => cart.selectedProducts.length >= 3)
  );

  constructor() {}

  public addProductToCart(product: Product) {
    const currentState = this.cartState;
    if (currentState.selectedProducts.find((p) => p.name === product.name)) {
      return;
    }
    const newState: Cart = {
      ...currentState,
      selectedProducts: [...currentState.selectedProducts, product],
    };
    this.cartStateSource$.next(newState);
  }

  public removeProductFromCart(product: Product) {
    const currentState = this.cartState;
    const newState: Cart = {
      ...currentState,
      selectedProducts: currentState.selectedProducts.filter(
        (p) => p.name !== product.name
      ),
    };
    this.cartStateSource$.next(newState);
  }

  public get cartState(): Cart {
    return this.cartStateSource$.getValue();
  }
}
