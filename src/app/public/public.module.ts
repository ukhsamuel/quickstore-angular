import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../_shared/shared.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';



@NgModule({
  declarations: [HomeComponent, ViewProductComponent, ViewCartComponent],
  imports: [
    RouterModule.forChild(PublicRoutes),
    CommonModule,
    NgbModule,
    SharedModule
  ]
})
export class PublicModule { }
