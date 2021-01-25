import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './card/product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductWidgetComponent } from './widget/product-widget/product-widget.component';
import { BrandCardComponent } from './card/brand-card/brand-card.component';
import { NavigationComponent } from './header-navigation/navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './header-navigation/topbar/topbar.component';
import { ProductQuickViewComponent } from './modals/product-quick-view/product-quick-view.component';
import { CartComponent } from './header-navigation/cart/cart.component';
import { PageTitleComponent } from './header-navigation/page-title/page-title.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductWidgetComponent,
    BrandCardComponent,
    NavigationComponent,
    FooterComponent,
    TopbarComponent,
    ProductQuickViewComponent,
    CartComponent,
    PageTitleComponent
  ],
  exports: [
    ProductCardComponent,
    ProductWidgetComponent,
    BrandCardComponent,
    NavigationComponent,
    PageTitleComponent,
    FooterComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class SharedModule { }
