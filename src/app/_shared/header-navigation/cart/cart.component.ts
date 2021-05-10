import { Component, OnInit } from '@angular/core';
import { ProductService, CartService } from '../../../core/services/';
import { Product, CartItem} from '../../../_shared/interfaces';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cartDetails$.subscribe(
      (details) => {
        this.cartItems = details;
        console.log('cart', details)
      }
    );
  }

  gotoCartPage(){
    this.router.navigate(['cart']);
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
