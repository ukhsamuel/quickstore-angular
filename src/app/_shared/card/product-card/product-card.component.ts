import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter,Input } from '@angular/core';
import { WishlistService } from '../../../core/services/';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  
  @Input() public product;
  @Output() viewProductEvent = new EventEmitter<string>();
  @Output() quickViewProductEvent = new EventEmitter<string>();
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() addToWishlistEvent = new EventEmitter<string>();

  

  constructor(
    public wishlistService: WishlistService
  ) { 
    // this.cartService.checkForProductInCart(1);

  }

  viewProduct(value: string) {
    // console.log('0394893')
    this.viewProductEvent.emit(value);
  }

  quickViewProduct(value: string) {
    this.quickViewProductEvent.emit(value);
  }
  
  addToCart(value: string) {
    this.addToCartEvent.emit(value);
  }

  addToWishlist(value: string) {
    console.log('vv')
    this.addToWishlistEvent.emit(value);
  }
  // constructor() { }

  // ngOnInit(): void {
  // }

}
