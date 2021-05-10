import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../_shared/shared.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ViewProductComponent, ViewCartComponent, ViewCategoryComponent, LoginComponent],
  imports: [
    RouterModule.forChild(PublicRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ]
})
export class PublicModule { }
