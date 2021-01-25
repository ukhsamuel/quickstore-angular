import { Component, OnInit } from '@angular/core';
import { ProductService, CartService } from '../../core/services/';
import { Product, CartItem} from '../../_shared/interfaces';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  cartItems : CartItem[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {


    this.cartService.cartDetails$.subscribe(
      (details) => {
        this.cartItems = details;
        console.log('cart', details)
      }
    );
  }

  quantityChanged(ev, i){
    console.log('changed', ev)
    console.log('index', i)
    let env = this
    if(ev)
      env.cartItems[i].quantity = ev;
  }

  deleteItem(id){
    this.cartService.removeFromCart(id)
  }

  returnTotal(){
    let total = 0;
    // calculate total of price
    this.cartItems.forEach(item =>{
      total += (item.price * item.quantity)
    })
    return total;
  }

}
