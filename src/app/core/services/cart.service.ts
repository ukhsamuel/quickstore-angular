import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AddToCart, RemoveFromCart, UpdateCart } from '../../store/actions';

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
    private store: Store<{ items: []; cart: [] }>,
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
    this.store.pipe(select(state => state)).subscribe(data => {
      this.cartItems = data['shop'].cart?data['shop'].cart:[];
    });
    console.log(this.cartItems);
  }


  public addToCart(product, quantity=1){

    if(this.productIndexInCart(product.id) > -1){
      let i = this.productIndexInCart(product.id);

      console.log(this.cartItems)
      console.log(this.cartItems[i].quantity)

      let cartItem = {
        productId : product.id,
        productName : product.name,
        photo: product.photo,
        price: product.price,
        brandId: product.brand.id,
        brandName: product.brand.name,
        categoryId: product.category.id,
        categoryName: product.category.name,
        quantity: this.cartItems[i].quantity + 1
      }
      this.store.dispatch(new UpdateCart(cartItem));

    }else{

      let newCartItem = {
        productId : product.id,
        productName : product.name,
        photo: product.photo,
        price: product.price,
        brandId: product.brand.id,
        brandName: product.brand.name,
        categoryId: product.category.id,
        categoryName: product.category.name,
        quantity
      }

      this.store.dispatch(new AddToCart(newCartItem));
    }
    
  }
  

  public removeFromCart(productId){
    this.store.dispatch(new RemoveFromCart(productId));
  }

  public removeAllFromCart(){
    this.cartItems = [];
    this.updateCartDetails(this.cartItems);
  }

  // return product index in cart
  productIndexInCart(productId){;
    var index = this.cartItems.findIndex(x => x.productId === productId);
    // return 0;
    return index;
  }
}
