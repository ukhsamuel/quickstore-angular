import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category, Product, CartItem} from '../../_shared/interfaces';
import { UtilitiesService} from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartSource = new BehaviorSubject<CartItem[]>(null);
  cartDetails$ = this.cartSource.asObservable();
  cartItems : CartItem[] = [];
 
  constructor(
    private utilities: UtilitiesService,
  ) { 
    this.loadCart();
  }

  //=======================UPDATE PRODUCT DETAILS========================================

  updateCartDetails(cartDetails: CartItem[]){
    this.cartSource.next(cartDetails);
    this.utilities.localStorageSetItem(this.utilities.storageObjName.cartItems,this.cartItems);
  }

  public loadCart(){
    let cartString = this.utilities.localStorageGetItem(this.utilities.storageObjName.cartItems);
    let cartArray = JSON.parse(cartString);
    this.cartItems = cartArray?cartArray:[]
    this.updateCartDetails(this.cartItems);
    // return this.cartItems;
    console.log(this.cartItems);
  }


  public addToCart(product:Product){

    // productIndexInCart(productId)
    let quantity = 1;

    console.log(this.productIndexInCart(product.id));

    if(this.productIndexInCart(product.id) > -1){
      let i = this.productIndexInCart(product.id);
      let cartQuantity = this.productQuantityInCart(product.id);

      // console.log(cartQuantity)
      this.cartItems[i].quantity += 1;

      this.updateCartDetails(this.cartItems);

      console.log(this.cartItems[i])
      // this.utilities.localStorageSetItem(this.utilities.storageObjName.cartItems,this.cartItems);

    }else{
      let cartQuantity = this.productQuantityInCart(product.id);

      let newCartItem = {
        productId : product.id,
        productName : product.name,
        photo: product.photos[0],
        price: product.price,
        brandId: product.brandId,
        brandName: product.brandName,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        quantity
      }

      console.log('newCartItem ',newCartItem)
      this.cartItems.push(newCartItem); 
      this.updateCartDetails(this.cartItems);
      // this.utilities.localStorageSetItem(this.utilities.storageObjName.cartItems,this.cartItems);

    }
    
  }
  
  public quantityChanged(index){

  }

  public removeFromCart(productId){
    var newCartItems = this.cartItems.filter(function (el) {
      return el.productId !== productId
    })
    this.cartItems = newCartItems;
    this.updateCartDetails(this.cartItems);
    
    console.log(newCartItems)
  }

  // check for product in cart and return quantity
  productQuantityInCart(productId){
    let cartString = this.utilities.localStorageGetItem(this.utilities.storageObjName.cartItems);
    let cartArray = JSON.parse(cartString);
    var productQuantity = 0;
    // var i = cartArray.some(function(el) {
    //   return el.productId === productId;
    // }); 
    var index = cartString?cartArray.findIndex(x => x.productId === productId):-1;
    
    // if product exists in cart return its quantity and index

    if(index > -1){
      productQuantity = cartArray[index].quantity;
    }else{
      productQuantity = 0;
    }
    return productQuantity;
    console.log(productQuantity);
  }

  isProductInCart(){
    
  }

  // return product index in cart
  productIndexInCart(productId){
    let cartString = this.utilities.localStorageGetItem(this.utilities.storageObjName.cartItems);
    let cartArray = JSON.parse(cartString);
    var index = (!!cartString)?cartArray.findIndex(x => x.productId === productId):-1;
    // return 0;
    return index;
  }
}
