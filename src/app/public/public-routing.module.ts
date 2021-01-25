import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';



export const PublicRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'view',
				component: ViewProductComponent
			},
			{
				path: 'view-cart',
				component: ViewCartComponent
			}
		]
	}
];
