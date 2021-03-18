import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category, Product, Brand} from '../../_shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

    storageObjName = {
      // saved device id
      cartItems: 'cartItems',
      wishlistItems: 'wishlistItems',
    };


  public productSource = new BehaviorSubject<Product>(null);
  productDetails$ = this.productSource.asObservable();

 
  constructor() { }



  //=======================UPDATE PRODUCT DETAILS========================================

  updateProductDetails(productDetails: Product){
    this.productSource.next(productDetails);
  }

    
  // Set to localstorage
  localStorageSetItem(key: string, val: any) {
    // console.log(key)
    val = JSON.stringify(val)
    localStorage.setItem(key, val);
  }

  // Get from localstorage
  localStorageGetItem(key: string) {
    const res = localStorage.getItem(key);
    return res;
  }

  localStorageDeleteItem(key: string) {
    console.log(key);
    localStorage.removeItem(key);
  }


}
