import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './_layouts/full/full.component';
import { BlankComponent } from './_layouts/blank/blank.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from './_shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ToastComponent } from './_shared/toast/toast.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';


import { CartReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    NgxTypeaheadModule,
    ToastNoAnimationModule.forRoot(),
    NgbModule,
    RouterModule.forRoot(AppRoutingModule, { useHash: false }),
    EffectsModule.forRoot([CartEffects]),
    StoreModule.forRoot({ shop: CartReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
