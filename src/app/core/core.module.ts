import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from './services/data-service.service';



@NgModule({
  declarations: [],
  providers:[
    DataServiceService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
