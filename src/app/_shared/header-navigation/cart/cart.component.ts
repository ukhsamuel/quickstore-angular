import { Component, OnInit } from '@angular/core';
import { ProductService, CartService } from '../../../core/services/';
import { Product, CartItem} from '../../../_shared/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
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
