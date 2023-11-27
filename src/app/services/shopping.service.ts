import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product, ProductGroup } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private cartStateSource$ = new BehaviorSubject<Cart>({
    selectedProducts: new Map<string, ProductGroup>([]),
    totalCount: 0,
    totalCost: 0,
  });

  public cart$ = this.cartStateSource$.asObservable();

  public cartTotalCost$ = this.cart$.pipe(map((cart) => cart.totalCost));

  public numProductsInCart$ = this.cart$.pipe(map((cart) => cart.totalCount));

  // ha 3-nál több terméket vesz -> ingyenes kiszállítás van
  public hasFreeShipping$ = this.cart$.pipe(
    map((cart) => cart.totalCount >= 3)
  );

  constructor() {}

  public addProductToCart(selectedProduct: Product, quantity: number = 1) {
    const currentState = this.cartState;
    const newState = {
      selectedProducts: new Map(currentState.selectedProducts),
      totalCost: currentState.totalCost,
      totalCount: currentState.totalCount + quantity,
    };

    const group = newState.selectedProducts.get(selectedProduct.name);
    const priceOfSelectedProducts = selectedProduct.price * quantity;
    if (group) {
      group.quantity += quantity;
      group.totalPrice += priceOfSelectedProducts;
      newState.totalCost += priceOfSelectedProducts;
    } else {
      newState.selectedProducts.set(selectedProduct.name, {
        name: selectedProduct.name,
        totalPrice: priceOfSelectedProducts,
        quantity: quantity,
        productPrice: selectedProduct.price,
      });
      newState.totalCost += priceOfSelectedProducts;
    }

    this.cartStateSource$.next(newState);
  }

  public updateQuantityBy(productName: string, quantityBy: number) {
    const currentState = this.cartState;

    const cartGroup = currentState.selectedProducts.get(productName);

    if (cartGroup) {
      const newState = {
        ...currentState,
        selectedProducts: new Map(currentState.selectedProducts),
        totalCount: currentState.totalCount + quantityBy,
      };

      const price = cartGroup.productPrice * quantityBy;
      cartGroup.quantity += quantityBy;
      cartGroup.totalPrice += price;
      newState.totalCost += price;
      this.cartStateSource$.next(newState);
    }
  }

  public removeProductFromCart(productName: string, quantity: number = 1) {
    const currentState = this.cartState;

    const group = currentState.selectedProducts.get(productName);
    if (group) {
      // let newQuantity = group.quantity - quantity;

      const newState = {
        ...currentState,
        selectedProducts: new Map(currentState.selectedProducts),
      };

      newState.totalCost -= group.totalPrice;
      newState.totalCount -= group.quantity;
      newState.selectedProducts.delete(productName);

      /*
      if (newQuantity < 1) {
        newState.totalCost -= group.totalPrice;
        newState.totalCount -= group.quantity;
        newState.selectedProducts.delete(productName);
      } else {
        const priceOfSelectedProducts = group.productPrice * quantity;
        group.quantity = newQuantity;
        group.totalPrice -= priceOfSelectedProducts;
        newState.totalCost -= priceOfSelectedProducts;
        newState.totalCount -= quantity;
      }
      */
      this.cartStateSource$.next(newState);
    }
  }

  public get cartState(): Cart {
    return this.cartStateSource$.getValue();
  }
}
