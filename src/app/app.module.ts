import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HeaderComponent } from './components/header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { HunMoneyPipe } from './pipes/hun-money.pipe';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';

registerLocaleData(localeHu, 'hu');

@NgModule({
  declarations: [AppComponent, HeaderComponent, HunMoneyPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    FormsModule,
    ButtonModule,
    ListboxModule,
    BadgeModule,
    OverlayPanelModule,
    MultiSelectModule,
    DropdownModule,
    RatingModule,
    SliderModule,
    DividerModule,
    InputNumberModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
