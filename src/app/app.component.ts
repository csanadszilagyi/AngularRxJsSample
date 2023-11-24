import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductResourceService } from './services/product-resource.service';
import { ShoppingService } from './services/shopping.service';
import {
  EMPTY,
  Observable,
  combineLatest,
  map,
  of,
  pipe,
  startWith,
} from 'rxjs';
import { Product, ProductCategory } from './models/product.model';
import { MultiSelect } from 'primeng/multiselect';
import { Slider } from 'primeng/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public categories = Object.values(ProductCategory);

  public productListSource$: Observable<Product[]> = EMPTY;

  @ViewChild('categorySelect') categorySelect!: MultiSelect;
  @ViewChild('priceRangeSlider') priceRangeSlider!: Slider;

  public categoriesSelected$: Observable<ProductCategory[]> = EMPTY;
  public priceRangeFilter$: Observable<number[]> = EMPTY;

  public productList$: Observable<Product[]> = of([]);

  public priceRange = [0, 10000];

  constructor(
    private productResourceService: ProductResourceService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.productListSource$ = this.productResourceService.getProducts();
    this.categoriesSelected$ = this.categorySelect.onChange.pipe(
      startWith({ value: [] }),
      map((v) => v?.value as ProductCategory[])
    );
    this.priceRangeFilter$ = this.priceRangeSlider.onChange.pipe(
      startWith({ values: this.priceRange }),
      map((e) => e?.values ?? [])
    );

    this.productList$ = combineLatest([
      this.productListSource$,
      this.categoriesSelected$,
      this.priceRangeFilter$,
    ]).pipe(
      map(([products, categories, priceRanges]) =>
        products
          .filter((p) =>
            categories.length ? categories.includes(p.category!) : true
          )
          .filter((p) => p.price >= priceRanges[0] && p.price <= priceRanges[1])
      )
    );
  }

  addCart(p: Product) {
    this.shoppingService.addProductToCart(p);
  }

  priceRangeChanged($event: any) {
    console.log($event);
    console.log(this.priceRange);
  }
  ngOnDestroy(): void {}
}
