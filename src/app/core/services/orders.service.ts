import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Order} from '../../_shared/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl + environment.basePath;


//   public productSource = new BehaviorSubject<Product>(null);
//   productDetails$ = this.productSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getOrders$(){
    return this.DOGET('/orders');
  }

  doOrders$(data){
    return this.DOPOST('/orders', data);
  }

  DOGET(url:string){
    return this.http.get(this.baseUrl + url); 
  }

  DOPOST(url:string,payload){
    return this.http.post<any>(this.baseUrl + url, payload)
  }

}
