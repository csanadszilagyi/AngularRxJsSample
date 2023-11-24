export enum ProductCategory {
  Meal = 'Meal',
  Drink = 'Drink',
  Soup = 'Soup',
}

export interface Product {
  name: string;
  price: number;
  rating?: number; // 1..5
  category: ProductCategory;
}
