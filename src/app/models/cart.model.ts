import { Product, ProductGroup } from './product.model';

export interface Cart {
  selectedProducts: Map<string, ProductGroup>; // store product groups by their name
  totalCost: number;
  totalCount: number;
}
