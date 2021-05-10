import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter,Input } from '@angular/core';
import { WishlistService } from '../../../core/services/';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductCardComponent {
  
  @Input() public product;
  @Output() viewProductEvent = new EventEmitter<string>();
  @Output() quickViewProductEvent = new EventEmitter<string>();
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() addToWishlistEvent = new EventEmitter<string>();

  

  constructor(
    public wishlistService: WishlistService,
    config: NgbRatingConfig
  ) {  
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
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
