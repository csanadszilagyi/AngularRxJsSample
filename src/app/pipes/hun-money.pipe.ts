import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
  name: 'hunMoney',
})
export class HunMoneyPipe implements PipeTransform {
  transform(
    value: number | string | null,
    currencyCode: string = 'HUF',
    display:
      | 'code'
      | 'symbol'
      | 'symbol-narrow'
      | string
      | boolean = 'symbol-narrow',
    digitsInfo: string = '1.0-0',
    locale: string = 'hu'
  ): string | null {
    if (value == null) {
      return '';
    }
    const convertedValue: number = typeof value === 'string' ? +value : value;
    return formatCurrency(
      convertedValue,
      locale,
      getCurrencySymbol(currencyCode, 'narrow'),
      currencyCode,
      digitsInfo
    );
  }
}
