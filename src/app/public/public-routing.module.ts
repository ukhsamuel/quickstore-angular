import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewCategoryComponent } from './view-category/view-category.component';



export const PublicRoutes: Routes = [
	{
	  path: '',
	  component: HomeComponent
	},
	{
	  path: 'login',
	  component: LoginComponent
	},
	{
		path: '',
		children: [
			{
				path: 'home',
				component: HomeComponent,
				data: {
					title: 'Home'
				}
			},
			{
				path: 'view',
				component: ViewProductComponent,
				data: {
					title: 'View Product'
				}
			},
			{
				path: 'cart',
				component: ViewCartComponent,
				data: {
					title: 'Cart'
				}
			},
			{
				path: 'category',
				component: ViewCategoryComponent,
				data: {
					title: 'View Category'
				}
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {
					title: 'Login'
				}
			},
			{
			  path: '',
			  redirectTo: 'home',
			  pathMatch: 'full'
			}
		]
	}
];
