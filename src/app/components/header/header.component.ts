import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public numProductsInCart$ = this.shoppingService.numProductsInCart$;
  public cartProducts$ = this.shoppingService.cart$.pipe(
    map((c) => c.selectedProducts)
  );
  public totalCost$ = this.shoppingService.cartTotalCost$;
  public hasFreeShipping$ = this.shoppingService.hasFreeShipping$.pipe(
    map((hasShipping) => (hasShipping ? 'Ingyenes kiszálítás!' : ''))
  );

  constructor(private shoppingService: ShoppingService) {}

  removeProduct($event: any, product: Product) {
    this.shoppingService.removeProductFromCart(product);
    if (this.shoppingService.cartState.selectedProducts.length > 0) {
      $event.stopPropagation();
    }
  }
}
