import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {  Product, WishListItem} from '../../_shared/interfaces';
import { UtilitiesService} from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  public wishListSource = new BehaviorSubject<WishListItem[]>(null);
  wishListDetails$ = this.wishListSource.asObservable();
  wishListItems : WishListItem[] = [];
 
  constructor(
    private utilities: UtilitiesService,
  ) { 
    this.loadWishlist();
  }

  //=======================UPDATE PRODUCT DETAILS========================================

  updateWishlistDetails(wishlistDetails: WishListItem[]){
    this.wishListSource.next(wishlistDetails);
    this.utilities.localStorageSetItem(this.utilities.storageObjName.wishlistItems,this.wishListItems);
  }

  public loadWishlist(){
    let wishListString = this.utilities.localStorageGetItem(this.utilities.storageObjName.wishlistItems);
    let wishListArray = JSON.parse(wishListString);
    this.wishListItems = wishListArray?wishListArray:[]
    this.updateWishlistDetails(this.wishListItems);
    console.log(this.wishListItems);
  }


  public addToWishlist(product:Product){
    console.log('newWishlistItem ',product)

    if(this.isProductInWishlist(product.id)){
      this.removeFromWishlist(product.id);
    }else{

      let newWishlistItem = {
        productId : product.id,
        productName : product.name,
        photo: product.photos[0],
        price: product.price,
        brandId: product.brandId,
        brandName: product.brandName,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
      }

      console.log('newWishlistItem ',newWishlistItem)
      this.wishListItems.push(newWishlistItem); 
      this.updateWishlistDetails(this.wishListItems);

    }
    
  }
  public removeFromWishlist(productId){
    var newWishlistItems = this.wishListItems.filter(function (el) {
      return el.productId !== productId
    })
    this.wishListItems = newWishlistItems;
    this.updateWishlistDetails(this.wishListItems);
    
    console.log(newWishlistItems)
  }


  isProductInWishlist(productId){
    var index = this.wishListItems.findIndex(x => x.productId === productId);
    // return 0;
    return index > -1?true:false;
  }
}
