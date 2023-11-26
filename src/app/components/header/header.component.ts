import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputNumberInputEvent } from 'primeng/inputnumber';
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
  public readonly quantityStep = 1;

  public numProductsInCart$ = this.shoppingService.numProductsInCart$;
  public cartProducts$ = this.shoppingService.cart$.pipe(
    map((c) => c.selectedProducts)
  );
  public totalCost$ = this.shoppingService.cartTotalCost$;
  public hasFreeShipping$ = this.shoppingService.hasFreeShipping$.pipe(
    map((hasShipping) => (hasShipping ? 'Ingyenes kiszálítás!' : ''))
  );

  constructor(private shoppingService: ShoppingService) {}

  handleQuantityChange($event: InputNumberInputEvent, productName: string) {
    const prevValue = parseInt($event.formattedValue);
    const currentValue = parseInt($event.value);

    this.shoppingService.updateQuantityBy(
      productName,
      currentValue > prevValue ? this.quantityStep : -this.quantityStep
    );
  }

  removeProduct($event: any, productName: string) {
    this.shoppingService.removeProductFromCart(productName);
    if (this.shoppingService.cartState.totalCount > 0) {
      $event.stopPropagation();
    }
  }
}
