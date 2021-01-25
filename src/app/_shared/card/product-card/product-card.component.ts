import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

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
  // constructor() { }

  // ngOnInit(): void {
  // }

}
