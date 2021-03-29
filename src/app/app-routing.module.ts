import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './_layouts/full/full.component';
import { BlankComponent } from './_layouts/blank/blank.component';

const routes: Routes = [];


export const AppRoutingModule: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
      }
    ]
  },
  {
    path: 'authentication',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
