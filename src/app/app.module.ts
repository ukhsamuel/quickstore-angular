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

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    NgbModule,
    RouterModule.forRoot(AppRoutingModule, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
